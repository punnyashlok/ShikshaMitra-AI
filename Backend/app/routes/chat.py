from fastapi import APIRouter
from pydantic import BaseModel

from app.services.groq_service import ask_ai

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):
    response = ask_ai(request.message)

    return {
        "response": response
    }