import type { NewMultipleChoiceQuestion } from "./schema.js";

export const seedMultipleChoiceQuestions: NewMultipleChoiceQuestion[] = [
  { id: 1, category: "capitals", prompt: "Katero je glavno mesto Avstrije?", options: ["Gradec", "Dunaj", "Salzburg", "Linz"], answer: "Dunaj" },
  { id: 2, category: "capitals", prompt: "Katero je glavno mesto Švice?", options: ["Zürich", "Ženeva", "Bern", "Basel"], answer: "Bern" },
  { id: 3, category: "countries", prompt: "Katera država nima morja?", options: ["Hrvaška", "Avstrija", "Italija", "Grčija"], answer: "Avstrija" },
];