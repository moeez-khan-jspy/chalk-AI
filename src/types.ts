export type SidebarSection = "home" | "profile" | "analytics" | "knowledge";
export type TaskType = "homework" | "assessment" | "lesson-plan";
export type ContentType = "video" | "presentation" | "flashcard" | "pdf" | "mindmap";
export type HomeStep = 1 | 2 | 3 | 4;
export type HomeView = "builder" | "flashcards" | "pdf" | "presentation" | "video" | "mindmap";

export type UploadMode = "none" | "upload" | "knowledge";

export interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "video";
  size: string;
  date: string;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  grade: string;
  avg: number;
  assignments: string;
  attendance: number;
  performance: number[];
  subjects: Record<string, number>;
}

