export interface QuizHistory {
  topic: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

const STORAGE_KEY = "quizHistory";

export function getQuizHistory(): QuizHistory[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as QuizHistory[];
  } catch (error) {
    console.error("Failed to parse quiz history:", error);
    return [];
  }
}

export function saveQuizResult(result: QuizHistory) {
  const history = getQuizHistory();

  history.unshift(result);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}

export function clearQuizHistory() {
  localStorage.removeItem(STORAGE_KEY);
}