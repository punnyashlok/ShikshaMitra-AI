import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="https://shikshamitra-ai-bnq5.onrender.com",
        port=8000,
        reload=True
    )