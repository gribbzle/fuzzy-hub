import { FormErrorAlert } from "../../../_components/FormErrorAlert";

interface QuizQuestionsEditorLoadAlertsProps {
  questionsError: unknown;
  answersError: unknown;
  actionError: string | null;
}

export function QuizQuestionsEditorLoadAlerts({
  questionsError,
  answersError,
  actionError,
}: QuizQuestionsEditorLoadAlertsProps) {
  return (
    <>
      {questionsError ? (
        <FormErrorAlert>
          {questionsError instanceof Error
            ? questionsError.message
            : "Failed to load questions."}
        </FormErrorAlert>
      ) : null}
      {answersError ? (
        <FormErrorAlert>
          {answersError instanceof Error
            ? answersError.message
            : "Failed to load answers."}
        </FormErrorAlert>
      ) : null}
      {actionError ? <FormErrorAlert>{actionError}</FormErrorAlert> : null}
    </>
  );
}
