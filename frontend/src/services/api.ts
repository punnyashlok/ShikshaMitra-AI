const API = "https://shikshamitra-ai-bnq5.onrender.com";

export async function askAI(message: string) {
  const response = await fetch(`${API}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  });

  const data = await response.json();

  return data.response;
}