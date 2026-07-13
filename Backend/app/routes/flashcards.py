from fastapi import APIRouter, HTTPException

from app.services.flashcard_service import generate_flashcards
from app.services.pdf_memory import get_pdf

router = APIRouter(
    tags=["🃏 Flashcards"]
)


@router.get("/flashcards")
async def flashcards():

    pdf = get_pdf()

    if not pdf.strip():
        raise HTTPException(
            status_code=400,
            detail="Upload a PDF first."
        )

    cards = generate_flashcards(pdf)

    return {
        "count": len(cards),
        "flashcards": cards
    }