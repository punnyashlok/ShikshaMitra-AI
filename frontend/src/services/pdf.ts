const API = "http://127.0.0.1:8000";

export interface DifficultTerm {
  word: string;
  meaning: string;
}

export interface StudyNotes {
  summary: string;
  key_concepts: string[];
  important_points: string[];
  difficult_terms: DifficultTerm[];
  real_life_examples: string[];
  exam_tips: string[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface PDFResponse {
  success: boolean;
  message: string;

  filename: string;
  characters: number;

  text: string;

  notes: StudyNotes;

  flashcards: Flashcard[];

  quiz: QuizQuestion[];
}

export async function uploadPDF(
  file: File
): Promise<PDFResponse> {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API}/pdf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to process PDF.");
  }

  return await response.json();
}