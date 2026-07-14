const API = "https://shikshamitra-ai-bnq5.onrender.com";

export async function scanImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API}/scan`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}