import json
import os
import tempfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.services.groq_service import ask_ai
from app.services.pdf_memory import save_pdf
from app.services.pdf_service import extract_pdf_text

router = APIRouter(tags=["📄 PDF Learning"])

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

    print("\n==============================")
    print("STEP 1 - PDF request received")
    print("==============================")

    # --------------------------------
    # Validate File
    # --------------------------------
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

        print("STEP 2 - PDF text extracted")
        print("Characters:", len(extracted_text))

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found."
        )

    # --------------------------------
    # Save Full PDF for Chat
    # --------------------------------
    save_pdf(extracted_text)

    print("STEP 3 - PDF saved for chat")

    # --------------------------------
    # Reduce prompt size
    # --------------------------------
    ai_text = extracted_text[:MAX_CHARS]

    print("STEP 4 - Sending first", len(ai_text), "characters to Groq")

    prompt = f"""
You are ShikshaMitra AI.

Read the study material carefully.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT explain anything outside JSON.

Generate:

- Short summary
- 6 key concepts
- 8 important points
- 5 difficult terms with meanings
- 4 real life examples
- 5 exam tips
- Exactly 10 flashcards
- Exactly 5 MCQs

Study Material:

{ai_text}

Return EXACTLY:

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

    try:

        ai_response = ask_ai(prompt)

        print("STEP 5 - Groq replied")

    except Exception as e:

        print("GROQ ERROR")
        print(e)

        raise HTTPException(
            status_code=500,
            detail=f"Groq API Error: {str(e)}"
        )

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

    try:

        data = clean_json(ai_response)

        print("STEP 6 - JSON parsed")

        notes = data.get("notes", notes)
        flashcards = data.get("flashcards", [])
        quiz = data.get("quiz", [])

    except Exception as e:

        print("JSON PARSE ERROR")
        print(e)

        print("Raw AI Response:")
        print(ai_response)

    print("STEP 7 - Returning response")

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