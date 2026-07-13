import json

from app.services.groq_service import ask_ai


def generate_flashcards(content: str):
    prompt = f"""
You are an expert teacher.

Read the study material below and generate exactly 15 flashcards.

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Keep answers concise.
- Make the flashcards suitable for revision.

Study Material:

{content}

Return exactly in this format:

[
    {{
        "front": "Question",
        "back": "Answer"
    }}
]
"""

    response = ask_ai(prompt)

    try:
        return json.loads(response)
    except Exception:
        return []