import { FetcherResponse } from "@admin/models";

export type QuizProfilePropertyWeightLevel = "low" | "medium" | "high";

export const QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS = [
  "time",
  "activity",
  "space",
  "kids",
  "allergy",
  "grooming",
  "interaction",
  "travel",
  "budget",
] as const;

export type QuizProfilePropertyWeightKey =
  (typeof QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS)[number];

export interface AdminQuizProfileItem {
  public_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface AdminQuizProfilesListData {
  items: AdminQuizProfileItem[];
  total: number;
}

export type AdminQuizProfilesListResponse =
  FetcherResponse<AdminQuizProfilesListData>;

export type AdminQuizProfilePropertyWeightsData = Record<
  QuizProfilePropertyWeightKey,
  QuizProfilePropertyWeightLevel
>;

export type AdminQuizProfilePropertyWeightsResponse =
  FetcherResponse<AdminQuizProfilePropertyWeightsData>;

export type AdminQuizProfileResponse = FetcherResponse<AdminQuizProfileItem>;
