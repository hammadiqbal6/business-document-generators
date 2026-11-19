#!/usr/bin/env python3
"""Score each Docuklin guide with a local RoBERTa OpenAI detector (optional)."""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def load_guides() -> list[dict]:
    export = ROOT / "tmp" / "guides-export.json"
    if export.exists():
        return json.loads(export.read_text())
    src = (ROOT / "src" / "data" / "guides.ts").read_text()
    # After '=' that follows export const guides, find value array (skip Guide[])
    m = re.search(r"export const guides\s*:\s*Guide\[\]\s*=\s*", src)
    if not m:
        raise SystemExit("Could not locate guides export")
    start = src.find("[", m.end() - 1)
    depth = 0
    end = None
    for i, ch in enumerate(src[start:], start):
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    if end is None:
        raise SystemExit("Could not parse guides array")
    return json.loads(src[start:end])


def guide_text(g: dict) -> str:
    parts = [g.get("answerFirst") or ""]
    for s in g.get("sections") or []:
        parts.append(s.get("heading") or "")
        parts.append(s.get("body") or "")
    for f in g.get("faq") or []:
        parts.append(f.get("question") or "")
        parts.append(f.get("answer") or "")
    text = "\n".join(parts)
    # Detector max length ~512 tokens; use a representative mid-article window.
    words = text.split()
    if len(words) > 420:
        mid = max(0, len(words) // 2 - 210)
        text = " ".join(words[mid : mid + 420])
    return text


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    parser.add_argument(
        "--model",
        default="openai-community/roberta-base-openai-detector",
        help="HF model id (fallback Hello-SimpleAI/chatgpt-detector-roberta)",
    )
    args = parser.parse_args()

    try:
        import torch
        from transformers import AutoModelForSequenceClassification, AutoTokenizer
    except Exception as exc:  # noqa: BLE001
        print(f"HF deps missing: {exc}", file=sys.stderr)
        return 2

    models_to_try = [args.model, "Hello-SimpleAI/chatgpt-detector-roberta"]
    tokenizer = model = None
    used = None
    last_err = None
    for mid in models_to_try:
        try:
            print(f"Loading {mid} …")
            tokenizer = AutoTokenizer.from_pretrained(mid)
            model = AutoModelForSequenceClassification.from_pretrained(mid)
            model.eval()
            used = mid
            break
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            print(f"Failed {mid}: {exc}", file=sys.stderr)
    if model is None or tokenizer is None:
        print(f"Could not load detector model: {last_err}", file=sys.stderr)
        return 3

    guides = load_guides()
    rows = []
    id2label = {int(k): v for k, v in getattr(model.config, "id2label", {}).items()}

    for g in guides:
        text = guide_text(g)
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            logits = model(**inputs).logits[0]
            probs = torch.softmax(logits, dim=-1).tolist()
        # Prefer Fake/AI class probability when labels available.
        ai_prob = None
        human_prob = None
        for idx, p in enumerate(probs):
            label = str(id2label.get(idx, idx)).lower()
            if label in {"fake", "ai", "chatgpt", "generated"}:
                ai_prob = p
            if label in {"real", "human"}:
                human_prob = p
        if ai_prob is None:
            # openai-community detector: typically Real=0, Fake=1
            if len(probs) == 2:
                ai_prob = probs[1]
                human_prob = probs[0]
            else:
                ai_prob = max(probs)
        rows.append(
            {
                "slug": g["slug"],
                "model": used,
                "ai_prob": round(float(ai_prob) * 100, 1),
                "human_prob": round(float(human_prob) * 100, 1) if human_prob is not None else None,
                "pass": float(ai_prob) < 0.30,
            }
        )

    Path(args.out).write_text(json.dumps({"model": used, "guides": rows}, indent=2))
    print(f"model={used}")
    print(f"{'slug':42} {'AI%':>6} {'pass'}")
    for r in rows:
        print(f"{r['slug']:42} {r['ai_prob']:6.1f} {'PASS' if r['pass'] else 'FAIL'}")
    passed = sum(1 for r in rows if r["pass"])
    print(f"\n{passed}/{len(rows)} guides under 30% AI probability ({used})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
