import { ApiResponse } from "@lib/api/types";

type Status = "active" | "inactive";

interface QuizQuestionAnswerResource {
  public_id: string;
  text: string;
}

export interface QuizQuestionResource {
  public_id: string;
  order_number: number;
  text: string;
  answers: QuizQuestionAnswerResource[];
}

export interface QuizWithRelationsResource {
  public_id: string;
  name: string;
  status: Status;
  questions: QuizQuestionResource[];
  created_at: string;
  updated_at: string;
}

export interface QuizListResource {
  items: QuizWithRelationsResource[];
  total: number;
}

export type QuizListResponse = ApiResponse<QuizListResource>;

export interface QuizAnswer {
  question_id: string;
  answer_id: string;
}

export interface SubmitQuizRequest {
  answers: QuizAnswer[];
}

interface QuizProfileWithScoreResource {
  public_id: string;
  name: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface QuizSubmitResultResource {
  quiz_id: string;
  profiles: QuizProfileWithScoreResource[];
}

export type QuizSubmitResultResponse = ApiResponse<QuizSubmitResultResource>;
