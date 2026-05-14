import { FetcherResponse } from "@admin/models";

export interface AdminQuizItem {
  public_id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AdminQuizzesListData {
  items: AdminQuizItem[];
  total: number;
}

export type AdminQuizzesListResponse = FetcherResponse<AdminQuizzesListData>;

export interface AdminQuizQuestionItem {
  public_id: string;
  order_number: number;
  text: string;
  property: string;
  created_at: string;
  updated_at: string;
}

export interface AdminQuizQuestionsListData {
  items: AdminQuizQuestionItem[];
  total: number;
}

export type AdminQuizQuestionsListResponse =
  FetcherResponse<AdminQuizQuestionsListData>;

export interface AdminQuizQuestionAnswerItem {
  public_id: string;
  text: string;
  property_weight: string;
  created_at: string;
  updated_at: string;
}

export interface AdminQuizQuestionAnswersListData {
  items: AdminQuizQuestionAnswerItem[];
  total: number;
}

export type AdminQuizQuestionAnswersListResponse =
  FetcherResponse<AdminQuizQuestionAnswersListData>;
