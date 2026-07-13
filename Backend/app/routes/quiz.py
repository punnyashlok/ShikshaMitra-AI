import json

from fastapi import APIRouter
from pydantic import BaseModel

from app.services.groq_service import ask_ai

router = APIRouter()


class QuizRequest(BaseModel):
    topic: str


@router.post("/quiz")
def generate_quiz(request: QuizRequest):

    prompt = f"""
Generate exactly 5 multiple choice questions for Class 7 students.

Topic:
{request.topic}

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

    response = ask_ai(prompt)

    try:
        quiz = json.loads(response)
    except Exception:
        return {
            "error": "AI returned invalid JSON.",
            "raw": response
        }

    return quiz