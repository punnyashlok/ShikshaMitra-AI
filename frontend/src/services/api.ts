const API = "http://127.0.0.1:8000";

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