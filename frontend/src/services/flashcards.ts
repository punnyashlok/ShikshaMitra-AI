const API = "https://shikshamitra-ai-bnq5.onrender.com";

export interface Flashcard {
  front: string;
  back: string;
}

export async function getFlashcards(): Promise<Flashcard[]> {
  const response = await fetch(`${API}/flashcards`);

  if (!response.ok) {
    throw new Error("Failed to load flashcards.");
  }

  const data = await response.json();

  return data.flashcards;
}