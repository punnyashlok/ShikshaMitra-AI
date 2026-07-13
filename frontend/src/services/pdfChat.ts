const API = "https://shikshamitra-ai-bnq5.onrender.com";

export async function askPDF(question: string) {
  const response = await fetch(`${API}/pdf/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to chat with PDF.");
  }

  return await response.json();
}