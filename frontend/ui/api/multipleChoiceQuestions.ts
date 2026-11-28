import { requestJson } from './api';

export type MultipleChoiceQuestion = { id: number; prompt: string; options: string[] };

export const getMultipleChoiceQuestions = async (type: string) =>
  (await requestJson(`/questions/multiple-choice?type=${type}`)) as MultipleChoiceQuestion[];

export const checkMultipleChoiceAnswer = async (questionId: number, answer: string) =>
  (await requestJson('/questions/multiple-choice/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, answer }),
  })) as { isCorrect: boolean; correctAnswer: string };