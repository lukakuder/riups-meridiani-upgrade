import type { NewTextAnswerQuestion } from "./schema.js";

export const seedTextAnswerQuestions: NewTextAnswerQuestion[] = [
  { id: 1, category: "capitals", prompt: "Katero je glavno mesto Francije?", answer: "Pariz" },
  { id: 2, category: "capitals", prompt: "Katero je glavno mesto Portugalske?", answer: "Lizbona" },
  { id: 3, category: "countries", prompt: "Katera država ima obliko škornja?", answer: "Italija" },
];