from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------
# Import API Routes
# ---------------------------------
from app.routes.chat import router as chat_router
from app.routes.quiz import router as quiz_router
from app.routes.pdf import router as pdf_router
from app.routes.pdf_chat import router as pdf_chat_router
from app.routes.flashcards import router as flashcards_router
from app.routes.study_planner import router as study_planner_router

# ---------------------------------
# FastAPI Application
# ---------------------------------
app = FastAPI(
    title="ShikshaMitra AI API",
    version="2.2.0",
    description="""
ShikshaMitra AI Backend

AI-powered educational platform featuring:

• AI Tutor
• Voice Tutor
• PDF Learning
• Chat with PDF
• AI Quiz Generator
• AI Flashcards
• AI Study Planner
• Learning Progress
""",
)

# ---------------------------------
# CORS Configuration
# ---------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://shiksha-mitra-ai-delta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Register API Routes
# ---------------------------------
app.include_router(chat_router)
app.include_router(quiz_router)
app.include_router(pdf_router)
app.include_router(pdf_chat_router)
app.include_router(flashcards_router)
app.include_router(study_planner_router)

# ---------------------------------
# Health Check
# ---------------------------------
@app.get("/", tags=["System"])
def home():
    return {
        "status": "running",
        "application": "ShikshaMitra AI",
        "version": "2.2.0",
        "message": "ShikshaMitra AI Backend is running successfully.",
        "features": [
            {
                "name": "AI Tutor",
                "endpoint": "/chat",
                "method": "POST",
            },
            {
                "name": "AI Quiz Generator",
                "endpoint": "/quiz",
                "method": "POST",
            },
            {
                "name": "PDF Learning",
                "endpoint": "/pdf",
                "method": "POST",
            },
            {
                "name": "Chat with PDF",
                "endpoint": "/pdf/chat",
                "method": "POST",
            },
            {
                "name": "AI Flashcards",
                "endpoint": "/flashcards",
                "method": "GET",
            },
            {
                "name": "AI Study Planner",
                "endpoint": "/study-planner",
                "method": "POST",
            },
            {
                "name": "Learning Progress",
                "endpoint": "Frontend",
                "method": "-",
            },
        ],
    }