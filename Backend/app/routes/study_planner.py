import json
import os
import tempfile

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
)

from app.services.groq_service import ask_ai
from app.services.pdf_service import extract_pdf_text

router = APIRouter(
    tags=["📅 Study Planner"]
)


def clean_json(text: str):
    text = (
        text.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    return json.loads(text)


@router.post("/study-planner")
async def generate_study_plan(
    file: UploadFile = File(...),
    subject: str = Form(...),
    exam_date: str = Form(...),
    study_hours: int = Form(...),
    difficulty: str = Form(...),
):

    # ---------------------------------------
    # Validate PDF
    # ---------------------------------------

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF syllabus."
        )

    suffix = os.path.splitext(file.filename)[1]

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix,
    ) as temp:

        temp.write(await file.read())
        temp_path = temp.name

    try:

        syllabus_text = extract_pdf_text(temp_path)

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)

    if not syllabus_text.strip():

        raise HTTPException(
            status_code=400,
            detail="No readable text found inside the syllabus PDF."
        )

    # ---------------------------------------
    # AI Prompt
    # ---------------------------------------

    prompt = f"""
You are ShikshaMitra AI.

Create a personalized study plan.

Student Details

Subject:
{subject}

Exam Date:
{exam_date}

Study Hours Per Day:
{study_hours}

Difficulty:
{difficulty}

----------------------------------------

SYLLABUS

{syllabus_text}

----------------------------------------

Instructions

1. Divide the syllabus intelligently.

2. Cover every topic.

3. Keep the workload balanced.

4. Reserve revision days.

5. Give practical revision tips.

Return ONLY valid JSON.

Do NOT use markdown.

Return EXACTLY this structure.

{{
    "overview":"",

    "daily_plan":[
        {{
            "day":"Day 1",
            "topics":[
                "",
                "",
                ""
            ]
        }}
    ],

    "revision_tips":[
        "",
        "",
        ""
    ]
}}
"""

    response = ask_ai(prompt)

    

    try:

        return clean_json(response)

    except Exception as e:

        print("Study Planner JSON Error:", e)

        return {
            "overview": "",

            "daily_plan": [],

            "revision_tips": [],
        }