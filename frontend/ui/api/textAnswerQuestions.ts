import { requestJson } from './api';

export type TextAnswerQuestion = { id: number; prompt: string };

export const getTextAnswerQuestions = async (type: string) =>
  (await requestJson(`/questions/text-answer?type=${type}`)) as TextAnswerQuestion[];

export const checkTextAnswer = async (questionId: number, answer: string) =>
  (await requestJson('/questions/text-answer/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionId, answer }),
  })) as { isCorrect: boolean; correctAnswer: string };