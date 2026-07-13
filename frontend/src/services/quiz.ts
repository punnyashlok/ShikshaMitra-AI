const API = "https://shikshamitra-ai-bnq5.onrender.com";

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