export type QuizzesApiPath =
  | { kind: "collection" }
  | { kind: "quiz"; id: string }
  | { kind: "other" };

export function parseQuizzesApiPath(pathname: string): QuizzesApiPath {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length === 4 &&
    segments[0] === "api" &&
    segments[1] === "v1" &&
    segments[2] === "admin" &&
    segments[3] === "quizzes"
  ) {
    return { kind: "collection" };
  }
  if (
    segments.length === 5 &&
    segments[2] === "admin" &&
    segments[3] === "quizzes"
  ) {
    return { kind: "quiz", id: decodeURIComponent(segments[4] ?? "") };
  }
  return { kind: "other" };
}

/** Paths under `/api/v1/admin/quizzes/...` including questions and answers. */
export type AdminQuizApiPath =
  | { kind: "quiz-collection" }
  | { kind: "quiz"; quizId: string }
  | { kind: "questions"; quizId: string }
  | { kind: "question"; quizId: string; questionId: string }
  | { kind: "answers"; quizId: string; questionId: string }
  | { kind: "answer"; quizId: string; questionId: string; answerId: string }
  | { kind: "other" };

export function parseAdminQuizApiPath(pathname: string): AdminQuizApiPath {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length < 4 ||
    segments[0] !== "api" ||
    segments[1] !== "v1" ||
    segments[2] !== "admin" ||
    segments[3] !== "quizzes"
  ) {
    return { kind: "other" };
  }

  if (segments.length === 4) {
    return { kind: "quiz-collection" };
  }

  const quizId = decodeURIComponent(segments[4] ?? "");

  if (segments.length === 5) {
    return { kind: "quiz", quizId };
  }

  if (segments.length === 6 && segments[5] === "questions") {
    return { kind: "questions", quizId };
  }

  if (segments.length === 7 && segments[5] === "questions") {
    return {
      kind: "question",
      quizId,
      questionId: decodeURIComponent(segments[6] ?? ""),
    };
  }

  if (
    segments.length === 8 &&
    segments[5] === "questions" &&
    segments[7] === "answers"
  ) {
    return {
      kind: "answers",
      quizId,
      questionId: decodeURIComponent(segments[6] ?? ""),
    };
  }

  if (
    segments.length === 9 &&
    segments[5] === "questions" &&
    segments[7] === "answers"
  ) {
    return {
      kind: "answer",
      quizId,
      questionId: decodeURIComponent(segments[6] ?? ""),
      answerId: decodeURIComponent(segments[8] ?? ""),
    };
  }

  return { kind: "other" };
}
