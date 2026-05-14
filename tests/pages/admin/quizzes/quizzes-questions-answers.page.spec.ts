import { expect, test } from "@playwright/test";

import {
  parseAdminQuizApiPath,
  parseQuizzesApiPath,
} from "./quizzes-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

interface MockQuestion {
  public_id: string;
  order_number: number;
  text: string;
  property: string;
  created_at: string;
  updated_at: string;
}

interface MockAnswer {
  public_id: string;
  text: string;
  property_weight: string;
  created_at: string;
  updated_at: string;
}

test.describe("Admin quiz questions and answers", () => {
  test("creates, edits, and deletes questions and answers", async ({
    page,
  }) => {
    const quizId = "quiz-playwright-qa";
    const initialQuizName = "Quiz for Q&A CRUD";
    const ts = "2026-04-18T12:00:00Z";

    const questions: MockQuestion[] = [];
    const answersByQuestionId = new Map<string, MockAnswer[]>();
    let questionSeq = 0;
    let answerSeq = 0;

    let lastQuestionPostBody = "";
    let lastQuestionPatchBody = "";
    let lastAnswerPostBody = "";
    let lastAnswerPatchBody = "";

    await page.route("**/api/v1/admin/quizzes**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const method = request.method();
      const extended = parseAdminQuizApiPath(url.pathname);
      const legacy = parseQuizzesApiPath(url.pathname);

      function json(body: unknown) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }

      if (method === "GET" && legacy.kind === "quiz" && legacy.id === quizId) {
        return json({
          data: {
            public_id: quizId,
            name: initialQuizName,
            status: "active",
            created_at: ts,
            updated_at: ts,
          },
        });
      }

      if (
        method === "GET" &&
        extended.kind === "questions" &&
        extended.quizId === quizId
      ) {
        const sorted = [...questions].sort(
          (a, b) => a.order_number - b.order_number,
        );
        return json({
          data: {
            items: sorted,
            total: sorted.length,
          },
        });
      }

      if (
        method === "GET" &&
        extended.kind === "answers" &&
        extended.quizId === quizId
      ) {
        const items = answersByQuestionId.get(extended.questionId) ?? [];
        return json({
          data: {
            items,
            total: items.length,
          },
        });
      }

      if (
        method === "POST" &&
        extended.kind === "questions" &&
        extended.quizId === quizId
      ) {
        lastQuestionPostBody = request.postData() ?? "";
        const body = JSON.parse(lastQuestionPostBody || "{}") as {
          order_number?: number;
          text?: string;
          property?: string;
        };
        questionSeq += 1;
        const publicId = `q-mock-${questionSeq}`;
        const row: MockQuestion = {
          public_id: publicId,
          order_number: body.order_number ?? 1,
          text: body.text ?? "",
          property: body.property ?? "",
          created_at: ts,
          updated_at: ts,
        };
        questions.push(row);
        answersByQuestionId.set(publicId, []);
        return json({ data: { public_id: publicId } });
      }

      if (
        method === "PATCH" &&
        extended.kind === "question" &&
        extended.quizId === quizId
      ) {
        lastQuestionPatchBody = request.postData() ?? "";
        const body = JSON.parse(lastQuestionPatchBody || "{}") as {
          order_number?: number;
          text?: string;
          property?: string;
        };
        const idx = questions.findIndex(
          (q) => q.public_id === extended.questionId,
        );
        if (idx === -1) {
          return route.fulfill({ status: 404, body: "{}" });
        }
        const prev = questions[idx]!;
        questions[idx] = {
          ...prev,
          order_number: body.order_number ?? prev.order_number,
          text: body.text ?? prev.text,
          property: body.property ?? prev.property,
          updated_at: ts,
        };
        return json({ data: { public_id: extended.questionId } });
      }

      if (
        method === "DELETE" &&
        extended.kind === "question" &&
        extended.quizId === quizId
      ) {
        const i = questions.findIndex(
          (q) => q.public_id === extended.questionId,
        );
        if (i !== -1) {
          questions.splice(i, 1);
        }
        answersByQuestionId.delete(extended.questionId);
        return json({ data: { public_id: extended.questionId } });
      }

      if (
        method === "POST" &&
        extended.kind === "answers" &&
        extended.quizId === quizId
      ) {
        lastAnswerPostBody = request.postData() ?? "";
        const body = JSON.parse(lastAnswerPostBody || "{}") as {
          text?: string;
          property_weight?: string;
        };
        answerSeq += 1;
        const publicId = `a-mock-${answerSeq}`;
        const row: MockAnswer = {
          public_id: publicId,
          text: body.text ?? "",
          property_weight: body.property_weight ?? "medium",
          created_at: ts,
          updated_at: ts,
        };
        const list = answersByQuestionId.get(extended.questionId) ?? [];
        list.push(row);
        answersByQuestionId.set(extended.questionId, list);
        return json({ data: { public_id: publicId } });
      }

      if (
        method === "PATCH" &&
        extended.kind === "answer" &&
        extended.quizId === quizId
      ) {
        lastAnswerPatchBody = request.postData() ?? "";
        const body = JSON.parse(lastAnswerPatchBody || "{}") as {
          text?: string;
          property_weight?: string;
        };
        const list = answersByQuestionId.get(extended.questionId) ?? [];
        const idx = list.findIndex((a) => a.public_id === extended.answerId);
        if (idx === -1) {
          return route.fulfill({ status: 404, body: "{}" });
        }
        const prev = list[idx]!;
        list[idx] = {
          ...prev,
          text: body.text ?? prev.text,
          property_weight: body.property_weight ?? prev.property_weight,
          updated_at: ts,
        };
        answersByQuestionId.set(extended.questionId, list);
        return json({ data: { public_id: extended.answerId } });
      }

      if (
        method === "DELETE" &&
        extended.kind === "answer" &&
        extended.quizId === quizId
      ) {
        const list = answersByQuestionId.get(extended.questionId) ?? [];
        const next = list.filter((a) => a.public_id !== extended.answerId);
        answersByQuestionId.set(extended.questionId, next);
        return json({ data: { public_id: extended.answerId } });
      }

      if (
        method === "PATCH" &&
        legacy.kind === "quiz" &&
        legacy.id === quizId
      ) {
        return json({ data: { public_id: quizId } });
      }

      return json({
        data: {
          items: [],
          total: 0,
        },
      });
    });

    await page.goto(
      `https://localhost:3000/admin/quizzes/${encodeURIComponent(quizId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Questions and answers" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Add question" }).click();
    const addQuestionDialog = page.getByRole("dialog", {
      name: "Add question",
    });
    await addQuestionDialog
      .getByPlaceholder("Does your pet have any allergies?")
      .fill("Allergies?");
    await addQuestionDialog
      .getByRole("button", { name: "Property key" })
      .click();
    await addQuestionDialog.getByRole("option", { name: "Allergy" }).click();
    await addQuestionDialog
      .getByRole("button", { name: "Create question" })
      .click();

    await expect(page.getByText("Allergies?")).toBeVisible();
    expect(lastQuestionPostBody).toBe(
      JSON.stringify({
        order_number: 1,
        text: "Allergies?",
        property: "allergy",
      }),
    );

    await page.getByRole("button", { name: "Add answer" }).click();
    const addAnswerDialog = page.getByRole("dialog", { name: "Add answer" });
    await addAnswerDialog
      .getByPlaceholder("Yes, my pet has allergies")
      .fill("No allergies");
    await addAnswerDialog.getByRole("radio", { name: "Low" }).click();
    await addAnswerDialog
      .getByRole("button", { name: "Create answer" })
      .click();

    await expect(page.getByText("No allergies")).toBeVisible();
    expect(lastAnswerPostBody).toBe(
      JSON.stringify({ text: "No allergies", property_weight: "low" }),
    );

    await page.getByRole("button", { name: "Add answer" }).click();
    const addSecondAnswer = page.getByRole("dialog", { name: "Add answer" });
    await addSecondAnswer
      .getByPlaceholder("Yes, my pet has allergies")
      .fill("Severe allergies");
    await addSecondAnswer
      .getByRole("button", { name: "Create answer" })
      .click();
    await expect(page.getByText("Severe allergies")).toBeVisible();

    const firstQuestionId = questions[0]?.public_id;
    expect(firstQuestionId).toBeTruthy();

    await page
      .locator("tr")
      .filter({ hasText: "Allergies?" })
      .getByRole("button", { name: "Edit", exact: true })
      .click();
    const editQuestionDialog = page.getByRole("dialog", {
      name: "Edit question",
    });
    await editQuestionDialog
      .getByPlaceholder("Does your pet have any allergies?")
      .fill("Allergies (updated)?");
    await editQuestionDialog
      .getByRole("button", { name: "Save question" })
      .click();
    await expect(page.getByText("Allergies (updated)?")).toBeVisible();
    expect(lastQuestionPatchBody).toBe(
      JSON.stringify({
        order_number: 1,
        text: "Allergies (updated)?",
        property: "allergy",
      }),
    );

    await page
      .getByRole("row")
      .filter({ hasText: "No allergies" })
      .getByRole("button", { name: "Edit" })
      .click();
    const editAnswerDialog = page.getByRole("dialog", { name: "Edit answer" });
    await editAnswerDialog
      .getByPlaceholder("Yes, my pet has allergies")
      .fill("No allergies (patched)");
    await editAnswerDialog.getByRole("radio", { name: "High" }).click();
    await editAnswerDialog.getByRole("button", { name: "Save answer" }).click();
    await expect(page.getByText("No allergies (patched)")).toBeVisible();
    expect(lastAnswerPatchBody).toBe(
      JSON.stringify({
        text: "No allergies (patched)",
        property_weight: "high",
      }),
    );

    await page
      .getByRole("row")
      .filter({ hasText: "Severe allergies" })
      .getByRole("button", { name: "Delete" })
      .click();
    const deleteAnswerDialog = page.getByRole("alertdialog", {
      name: "Delete answer?",
    });
    await deleteAnswerDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();
    await expect(page.getByText("Severe allergies")).not.toBeVisible();

    await page
      .locator("tr")
      .filter({ hasText: "Allergies (updated)?" })
      .getByRole("button", { name: "Delete", exact: true })
      .click();
    const deleteQuestionDialog = page.getByRole("alertdialog", {
      name: "Delete question?",
    });
    await deleteQuestionDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();
    await expect(page.getByText("No questions yet.")).toBeVisible();
  });

  test("cancels delete answer without calling the API", async ({ page }) => {
    const quizId = "quiz-playwright-qa-cancel";
    const qId = "q-existing";
    const aId = "a-existing";
    const ts = "2026-04-18T12:00:00Z";

    let deleteAnswerRequests = 0;

    await page.route("**/api/v1/admin/quizzes**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const method = request.method();
      const extended = parseAdminQuizApiPath(url.pathname);
      const legacy = parseQuizzesApiPath(url.pathname);

      function json(body: unknown) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }

      if (method === "GET" && legacy.kind === "quiz" && legacy.id === quizId) {
        return json({
          data: {
            public_id: quizId,
            name: "Cancel delete quiz",
            status: "active",
            created_at: ts,
            updated_at: ts,
          },
        });
      }

      if (
        method === "GET" &&
        extended.kind === "questions" &&
        extended.quizId === quizId
      ) {
        return json({
          data: {
            items: [
              {
                public_id: qId,
                order_number: 1,
                text: "Keep me",
                property: "time",
                created_at: ts,
                updated_at: ts,
              },
            ],
            total: 1,
          },
        });
      }

      if (
        method === "GET" &&
        extended.kind === "answers" &&
        extended.quizId === quizId
      ) {
        return json({
          data: {
            items: [
              {
                public_id: aId,
                text: "Answer to keep",
                property_weight: "medium",
                created_at: ts,
                updated_at: ts,
              },
            ],
            total: 1,
          },
        });
      }

      if (method === "DELETE" && extended.kind === "answer") {
        deleteAnswerRequests += 1;
        return json({ data: { public_id: extended.answerId } });
      }

      return json({ data: { items: [], total: 0 } });
    });

    await page.goto(
      `https://localhost:3000/admin/quizzes/${encodeURIComponent(quizId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page
      .getByRole("row")
      .filter({ hasText: "Answer to keep" })
      .getByRole("button", { name: "Delete" })
      .click();
    const deleteAnswerDialog = page.getByRole("alertdialog", {
      name: "Delete answer?",
    });
    await deleteAnswerDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(deleteAnswerDialog).not.toBeVisible();
    expect(deleteAnswerRequests).toBe(0);
    await expect(page.getByText("Answer to keep")).toBeVisible();
  });
});
