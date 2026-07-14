import json
import os
import tempfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.groq_service import ask_ai
from app.services.pdf_memory import save_pdf
from app.services.pdf_service import extract_pdf_text

router = APIRouter(
    tags=["📄 PDF Learning"]
)

MAX_CHARS = 12000


def clean_json(text: str):
    if not text:
        return {}

    text = (
        text.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(text)


@router.post("/pdf")
async def explain_pdf(file: UploadFile = File(...)):

    # -----------------------------
    # Validate File
    # -----------------------------
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    suffix = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix,
    ) as temp:

        temp.write(await file.read())
        temp_path = temp.name

    try:
        extracted_text = extract_pdf_text(temp_path)

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found."
        )

    # -----------------------------
    # Save Full PDF For Chat
    # -----------------------------
    save_pdf(extracted_text)

    # -----------------------------
    # Limit AI Input Size
    # -----------------------------
    ai_text = extracted_text[:MAX_CHARS]

    # -----------------------------
    # AI Prompt
    # -----------------------------
    prompt = f"""
You are ShikshaMitra AI.

Read the following study material and generate study resources.

Return ONLY valid JSON.

Do not use markdown.

Generate:

- Short summary
- 6 key concepts
- 8 important points
- 5 difficult terms with meanings
- 4 real life examples
- 5 exam tips
- Exactly 10 flashcards
- Exactly 5 MCQs

Text:

{ai_text}

Return exactly:

{{
  "notes": {{
    "summary": "",
    "key_concepts": [],
    "important_points": [],
    "difficult_terms": [
      {{
        "word": "",
        "meaning": ""
      }}
    ],
    "real_life_examples": [],
    "exam_tips": []
  }},
  "flashcards": [
    {{
      "front": "",
      "back": ""
    }}
  ],
  "quiz": [
    {{
      "question": "",
      "options": [
        "",
        "",
        "",
        ""
      ],
      "answer": ""
    }}
  ]
}}
"""

    ai_response = ask_ai(prompt)

    notes = {
        "summary": "",
        "key_concepts": [],
        "important_points": [],
        "difficult_terms": [],
        "real_life_examples": [],
        "exam_tips": [],
    }

    flashcards = []
    quiz = []

    if ai_response:

        try:

            data = clean_json(ai_response)

            notes = data.get("notes", notes)

            flashcards = data.get("flashcards", [])

            quiz = data.get("quiz", [])

        except Exception as e:

            print("JSON Parse Error:", e)

    return {
        "success": True,
        "message": "PDF processed successfully.",

        "filename": file.filename,
        "characters": len(extracted_text),

        "text": extracted_text,

        "notes": notes,

        "flashcards": flashcards,

        "quiz": quiz,
    }