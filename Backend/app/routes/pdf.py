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


def clean_json(text: str):
    """
    Remove markdown code fences and parse JSON.
    """
    text = (
        text.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(text)


@router.post("/pdf")
async def explain_pdf(file: UploadFile = File(...)):

    # --------------------------------------------------
    # Validate Uploaded File
    # --------------------------------------------------
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
            detail="No readable text found in the PDF."
        )

    # --------------------------------------------------
    # Save PDF for Chat
    # --------------------------------------------------
    save_pdf(extracted_text)

    # --------------------------------------------------
    # Generate Study Material
    # --------------------------------------------------
    study_prompt = f"""
You are ShikshaMitra AI.

Read the chapter carefully.

Return ONLY valid JSON.

Do NOT wrap the JSON inside markdown.
Do NOT write any explanation.

Generate:

1. Study Notes
2. Exactly 10 Flashcards
3. Exactly 5 MCQs

Chapter:

{extracted_text}

Return EXACTLY this structure:

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

    response = ask_ai(study_prompt)

    try:

        data = clean_json(response)

        notes = data.get("notes", {})

        flashcards = data.get("flashcards", [])

        quiz = data.get("quiz", [])

    except Exception as e:

        print("Combined JSON Error:", e)

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

    # --------------------------------------------------
    # Response
    # --------------------------------------------------
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