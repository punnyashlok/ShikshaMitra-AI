const API = "http://127.0.0.1:8000";

export async function generateQuiz(topic: string) {
  const response = await fetch(`${API}/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
    }),
  });

  return await response.json();
}