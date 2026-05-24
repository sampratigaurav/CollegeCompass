import { parseNTA } from "./parsers/ntaParser";
import { parseDefault } from "./parsers/defaultParser";
import { EXAMS_REGISTRY } from "./registry";

export async function fetchExamNotices(examId: string): Promise<{ rawText: string; success: boolean }> {
  const exam = EXAMS_REGISTRY.find(e => e.id === examId);
  if (!exam) return { rawText: "", success: false };
  
  const url = exam.noticesPage || exam.officialSite;
  
  switch (exam.parser) {
    case "nta":
      return await parseNTA(url);
    case "bits":
    case "kea":
    default:
      // Fallback to default generic HTML parser for V1
      return await parseDefault(url);
  }
}
