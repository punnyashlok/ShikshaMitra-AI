import json
import os
import tempfile

from fastapi import APIRouter, File, UploadFile

from app.services.groq_service import ask_ai
from app.services.ocr_service import extract_text

router = APIRouter()


@router.post("/scan")
async def scan(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
        temp.write(await file.read())
        temp_path = temp.name

    extracted_text = extract_text(temp_path)

    os.remove(temp_path)

    if not extracted_text.strip():
        return {
            "text": "",
            "explanation": "No readable text was found.",
            "quiz": []
        }

    explanation_prompt = f"""
You are an expert teacher.

Explain the following chapter to a Class 7 student.

Chapter:

{extracted_text}

Your response should include:

1. Simple Explanation
2. Summary
3. Important Points
4. Real-life Example
"""

    explanation = ask_ai(explanation_prompt)

    quiz_prompt = f"""
Generate exactly 5 multiple choice questions.

Chapter:

{extracted_text}

Return ONLY valid JSON.

Format:

[
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
"""

    quiz_response = ask_ai(quiz_prompt)

    try:
        quiz = json.loads(quiz_response)
    except Exception:
        quiz = []

    return {
        "text": extracted_text,
        "explanation": explanation,
        "quiz": quiz
    }