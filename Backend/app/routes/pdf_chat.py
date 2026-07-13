from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.groq_service import ask_ai
from app.services.pdf_memory import get_pdf

router = APIRouter(
    tags=["📄 PDF Chat"]
)


class PDFQuestion(BaseModel):
    question: str


@router.post("/pdf/chat")
async def chat_with_pdf(request: PDFQuestion):

    pdf_text = get_pdf()

    if not pdf_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No PDF has been uploaded yet."
        )

    prompt = f"""
You are ShikshaMitra AI.

Answer the student's question ONLY using the uploaded PDF.

Rules:

- Never invent information.
- If the answer is not found inside the PDF, reply:

"I couldn't find that information in the uploaded PDF."

Uploaded PDF:

{pdf_text}

Student Question:

{request.question}
"""

    answer = ask_ai(prompt)

    return {
        "answer": answer
    }