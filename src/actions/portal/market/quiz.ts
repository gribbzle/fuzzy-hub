"use server";

import { actionClient } from "@lib/api/api-client";

import {
  QuizListResource,
  QuizListResponse,
  QuizSubmitResultResource,
  QuizSubmitResultResponse,
  SubmitQuizRequest,
} from "@portal/market/models";

export const getPetsMatchingQuizAction = async (): Promise<QuizListResponse> =>
  actionClient<QuizListResource>("/portal/quizzes/active", {
    method: "GET",
  });

export const submitQuizAnswersAction = async (
  quiz: string,
  params: SubmitQuizRequest,
): Promise<QuizSubmitResultResponse> =>
  actionClient<QuizSubmitResultResource>(`/portal/quizzes/${quiz}/submit`, {
    method: "POST",
    body: JSON.stringify(params),
  });
