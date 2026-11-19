#!/usr/bin/env python3
"""
Local AI-text detector for Docuklin page copy (not wired into CI).

Uses Hugging Face open-source detectors when available:
  - openai-community/roberta-base-openai-detector
  - Hello-SimpleAI/chatgpt-detector-roberta

Usage:
  python3 scripts/audit/ai-text-detect.py path/to/text.txt
  python3 scripts/audit/ai-text-detect.py --slug roofing-estimate-template

Exit 0 always (informational). Prints a markdown table of AI probabilities.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def extract_tool_prose(slug: str) -> str:
    """Pull human-facing prose from a ToolDefinition TypeScript object."""
    # Prefer trade presets file, then estimates.ts
    candidates = [
        ROOT / "src/data/tools/trade-estimate-presets.ts",
        ROOT / "src/data/tools/estimates.ts",
        ROOT / "src/data/tools/contracts.ts",
        ROOT / "src/data/tools/forms-creative.ts",
    ]
    src = ""
    for path in candidates:
        if path.exists() and slug in path.read_text(encoding="utf-8"):
            src = path.read_text(encoding="utf-8")
            break
    if not src:
        raise SystemExit(f"Could not find tool slug {slug!r} in tool data files")

    # Slice from slug: '…' through the next export or EOF
    m = re.search(rf"slug:\s*'{re.escape(slug)}'", src)
    if not m:
        raise SystemExit(f"slug literal not found for {slug}")
    chunk = src[m.start() :]
    next_export = re.search(r"\nexport const ", chunk[10:])
    if next_export:
        chunk = chunk[: next_export.start() + 10]

    strings: list[str] = []
    for key in (
        "answerFirst",
        "metaDescription",
        "heading",
        "body",
        "question",
        "answer",
        "tips",
        "commonMistakes",
        "howToUse",
        "formulaNote",
    ):
        for sm in re.finditer(
            rf"{key}:\s*(?:\[\s*)?(?:'((?:\\.|[^'\\])*)'|\"((?:\\.|[^\"\\])*)\")",
            chunk,
        ):
            raw = sm.group(1) if sm.group(1) is not None else sm.group(2)
            text = bytes(raw, "utf-8").decode("unicode_escape")
            strings.append(text)

    # Also capture array string members under howToUse / tips / commonMistakes
    for arr_key in ("howToUse", "commonMistakes", "tips"):
        am = re.search(rf"{arr_key}:\s*\[(.*?)\]", chunk, re.S)
        if not am:
            continue
        for sm in re.finditer(r"'((?:\\.|[^'\\])*)'|\"((?:\\.|[^\"\\])*)\"", am.group(1)):
            raw = sm.group(1) if sm.group(1) is not None else sm.group(2)
            strings.append(bytes(raw, "utf-8").decode("unicode_escape"))

    # Dedupe while preserving order
    seen: set[str] = set()
    out: list[str] = []
    for s in strings:
        s = s.strip()
        if len(s) < 40 or s in seen:
            continue
        seen.add(s)
        out.append(s)
    return "\n\n".join(out)


def chunk_text(text: str, max_chars: int = 1200) -> list[str]:
    paras = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    chunks: list[str] = []
    buf = ""
    for p in paras:
        if len(buf) + len(p) + 2 <= max_chars:
            buf = f"{buf}\n\n{p}".strip()
        else:
            if buf:
                chunks.append(buf)
            if len(p) <= max_chars:
                buf = p
            else:
                for i in range(0, len(p), max_chars):
                    chunks.append(p[i : i + max_chars])
                buf = ""
    if buf:
        chunks.append(buf)
    return chunks or [text[:max_chars]]


def score_with_pipeline(model_id: str, chunks: list[str]) -> dict:
    from transformers import pipeline

    clf = pipeline("text-classification", model=model_id, truncation=True)
    ai_scores: list[float] = []
    labels: list[str] = []
    for ch in chunks:
        # Some models truncate poorly on very short input
        sample = ch if len(ch) >= 64 else (ch + " " + ch)
        result = clf(sample[:2000])[0]
        label = str(result["label"]).upper()
        score = float(result["score"])
        labels.append(label)
        # Normalize to P(AI)
        if label in {"AI", "FAKE", "GPT", "CHATGPT", "LABEL_1", "1"}:
            ai_scores.append(score)
        elif label in {"HUMAN", "REAL", "LABEL_0", "0"}:
            ai_scores.append(1.0 - score)
        else:
            # Unknown label space — treat higher "Fake"/second class heuristically
            ai_scores.append(score if "FAKE" in label or "AI" in label else 1.0 - score)
    mean_ai = sum(ai_scores) / len(ai_scores)
    return {
        "model": model_id,
        "chunks": len(chunks),
        "ai_probability": round(mean_ai, 4),
        "max_ai_probability": round(max(ai_scores), 4),
        "sample_labels": labels[:3],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path", nargs="?", help="Plain text file to score")
    parser.add_argument("--slug", help="Tool slug to extract prose from")
    parser.add_argument("--json", action="store_true", help="Emit JSON")
    args = parser.parse_args()

    if args.slug:
        text = extract_tool_prose(args.slug)
        label = args.slug
    elif args.path:
        text = Path(args.path).read_text(encoding="utf-8")
        label = args.path
    else:
        parser.error("Provide a text path or --slug")

    chunks = chunk_text(text)
    models = [
        "openai-community/roberta-base-openai-detector",
        "Hello-SimpleAI/chatgpt-detector-roberta",
    ]
    rows = []
    for model_id in models:
        try:
            rows.append(score_with_pipeline(model_id, chunks))
        except Exception as exc:  # noqa: BLE001 — report and continue
            rows.append(
                {
                    "model": model_id,
                    "error": str(exc)[:240],
                    "ai_probability": None,
                }
            )

    if args.json:
        print(json.dumps({"label": label, "chars": len(text), "results": rows}, indent=2))
        return

    print(f"## AI detector: `{label}` ({len(text)} chars, {len(chunks)} chunks)\n")
    print("| Model | AI probability (mean) | Max chunk | Notes |")
    print("|-------|----------------------:|----------:|-------|")
    for r in rows:
        if r.get("error"):
            print(f"| `{r['model']}` | — | — | error: {r['error'][:80]} |")
        else:
            pct = f"{r['ai_probability']*100:.1f}%"
            mx = f"{r['max_ai_probability']*100:.1f}%"
            note = "pass (<30%)" if r["ai_probability"] < 0.30 else "REWRITE (≥30%)"
            print(f"| `{r['model']}` | {pct} | {mx} | {note} |")


if __name__ == "__main__":
    main()
