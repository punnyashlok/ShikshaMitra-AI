const API = "https://shikshamitra-ai-bnq5.onrender.com";

export interface DailyPlan {
  day: string;
  topics: string[];
}

export interface StudyPlannerResponse {
  overview: string;
  daily_plan: DailyPlan[];
  revision_tips: string[];
}

export async function generateStudyPlan(
  file: File,
  subject: string,
  examDate: string,
  studyHours: number,
  difficulty: string
): Promise<StudyPlannerResponse> {

  const formData = new FormData();

  formData.append("file", file);
  formData.append("subject", subject);
  formData.append("exam_date", examDate);
  formData.append("study_hours", studyHours.toString());
  formData.append("difficulty", difficulty);

  const response = await fetch(`${API}/study-planner`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {

    const error = await response.text();

    throw new Error(
      error || "Failed to generate study plan."
    );

  }

  return response.json();
}