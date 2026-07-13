const API = "http://127.0.0.1:8000";

export async function scanImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API}/scan`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}