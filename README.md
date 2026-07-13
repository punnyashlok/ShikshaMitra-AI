# ShikshaMitra AI

## Introduction

ShikshaMitra AI is an AI-powered educational platform developed to simplify learning by combining multiple study tools into a single application. It helps students understand concepts, generate quizzes, create flashcards, analyze PDF notes, and prepare personalized study schedules.

The objective of this project is to reduce the need for multiple learning applications by providing an integrated AI-assisted learning environment.

---

## Features

- AI Tutor for answering academic questions
- OCR-based textbook scanner
- PDF learning with AI-generated notes
- Chat with uploaded PDF documents
- Automatic quiz generation
- Flashcard generation
- Personalized study planner using uploaded syllabus PDFs
- Learning progress dashboard

---

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion

### Backend
- FastAPI
- Python

### AI Integration
- Groq API (Llama Models)

### Libraries
- PyMuPDF
- Tesseract OCR
- Pillow

---

## Project Structure

```
ShikshaMitra-AI
│
├── Backend
│   ├── app
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

## Installation

### Backend

```bash
cd Backend
pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

The backend runs on:

```
http://127.0.0.1:8000
```

---

## Modules

### AI Tutor

Provides answers to academic questions using a large language model.

### OCR Scanner

Extracts text from textbook images using OCR and allows students to ask questions about the extracted content.

### PDF Learning

Processes uploaded PDF documents and generates:
- Notes
- Important concepts
- Flashcards
- Quiz questions

### Chat with PDF

Allows users to interact with uploaded study material through a conversational interface.

### Quiz Generator

Creates multiple-choice questions based on the selected topic or uploaded content.

### Flashcards

Generates revision flashcards for quick learning.

### Study Planner

Creates a personalized study schedule based on:
- Subject
- Syllabus PDF
- Exam date
- Daily study hours
- Difficulty level

### Progress Dashboard

Displays quiz statistics and learning progress.

---

## Future Improvements

Some features planned for future versions include:

- User authentication
- Cloud database support
- Progress synchronization across devices
- Voice-based AI tutor
- Multi-language support
- Performance analytics

---

## Developed By

Punnyashlok

Hackathon Project – 2026