#!/usr/bin/env python3
"""Optional Hugging Face AI-text detectors. Reads text from stdin.

Tries openai-community/roberta-base-openai-detector then
Hello-SimpleAI/chatgpt-detector-roberta when transformers is installed.
Exits 0 always when models are unavailable (caller treats as skip).
"""
from __future__ import annotations

import sys

text = sys.stdin.read().strip()
if not text:
    print("no input")
    sys.exit(0)

try:
    from transformers import pipeline  # type: ignore
except Exception as exc:  # noqa: BLE001
    print(f"transformers unavailable ({exc})", file=sys.stderr)
    sys.exit(0)

MODELS = [
    "openai-community/roberta-base-openai-detector",
    "Hello-SimpleAI/chatgpt-detector-roberta",
]

chunk = text[:4000]
for name in MODELS:
    try:
        clf = pipeline("text-classification", model=name, truncation=True)
        out = clf(chunk)[0]
        label = out.get("label", "?")
        score = float(out.get("score", 0))
        # Normalize toward “AI probability”
        ai = score if "AI" in str(label).upper() or str(label).upper() in {"FAKE", "LABEL_0"} else 1.0 - score
        if str(label).upper() in {"Real".upper(), "HUMAN", "LABEL_1"}:
            ai = 1.0 - score
        print(f"{name}: label={label} score={score:.3f} ai_prob≈{ai * 100:.1f}%")
    except Exception as exc:  # noqa: BLE001
        print(f"{name}: failed ({exc})", file=sys.stderr)
