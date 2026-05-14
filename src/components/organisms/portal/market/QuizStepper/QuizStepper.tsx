"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Progress,
  Tab,
  Tabs,
  Typography,
} from "@portal/ui/atoms";
import { Heart as HeartIcon } from "@portal/ui/icons";

import {
  QuizAnswer,
  QuizSubmitResultResponse,
  QuizWithRelationsResource,
  SubmitQuizRequest,
} from "@portal/market/models";

interface QuizStepperProps {
  quiz: QuizWithRelationsResource;
  onNextStep?: (
    quiz: string,
    params: SubmitQuizRequest,
  ) => Promise<QuizSubmitResultResponse>;
}

export const QuizStepper = ({ quiz, onNextStep }: QuizStepperProps) => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const { public_id, questions } = quiz;

  const currentQuestion = questions[currentStepIndex];
  const lastStepIndex = questions.length - 1;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === lastStepIndex;

  const currentAnswerId = useMemo(
    () =>
      answers.find((a) => a.question_id === currentQuestion.public_id)
        ?.answer_id,
    [answers, currentQuestion.public_id],
  );

  const handleNextStepClick = useCallback(async () => {
    if (!currentAnswerId) {
      return;
    }

    if (isLastStep) {
      await onNextStep?.(public_id, { answers });

      return;
    }

    setCurrentStepIndex((prev) => prev + 1);
  }, [currentAnswerId, isLastStep, onNextStep, public_id, answers]);

  const handleBackStepClick = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleAnswerChange = useCallback(
    (value: string) => {
      setAnswers((prev) => {
        const existingIndex = prev.findIndex(
          (a) => a.question_id === currentQuestion.public_id,
        );

        if (existingIndex !== -1) {
          const updated = [...prev];

          updated[existingIndex] = {
            ...updated[existingIndex],
            answer_id: value,
          };

          return updated;
        }

        return [
          ...prev,
          { question_id: currentQuestion.public_id, answer_id: value },
        ];
      });
    },
    [currentQuestion.public_id],
  );

  const progress = useMemo(
    () => Math.floor((currentStepIndex / questions.length) * 100),
    [currentStepIndex, questions.length],
  );

  return (
    <>
      <Progress value={progress} className="large-desktop:px-4" />
      <Box className="items-center large-desktop:gap-13 tablet:gap-10">
        <Alert
          icon={HeartIcon}
          className="w-fit tablet:alert-large max-tablet:alert-small"
        >
          This quiz helps avoid mismatches and ensures a happy long-term fit.
        </Alert>
        <Box className="large-desktop:gap-13 tablet:gap-10 max-tablet:px-2">
          <Box className="gap-8 max-tablet:gap-6">
            <Box className="gap-2">
              <p className="text-20 text-center font-semibold max-tablet:text-14">
                <span className="text-text-default">
                  {currentStepIndex + 1}
                </span>
                <span className="text-[#636579]">/{questions.length}</span>
              </p>
              <Typography
                variant="h1"
                className="text-center max-tablet:-translate-y-px"
              >
                {currentQuestion.text}
              </Typography>
            </Box>
            <Tabs
              className="flex-col gap-4 max-tablet:items-stretch"
              onChange={handleAnswerChange}
              value={currentAnswerId}
              name="answer"
            >
              {currentQuestion.answers.map((answer) => (
                <Tab
                  key={answer.public_id}
                  label={answer.text}
                  value={answer.public_id}
                  className="desktop:tab-large tablet:tab-medium max-tablet:tab-small max-tablet:justify-start"
                />
              ))}
            </Tabs>
          </Box>
          <Box className="flex-row justify-center gap-6 max-desktop:gap-4 w-full">
            <Button
              variant="secondary"
              className="desktop:w-80 tablet:w-55 desktop:btn-large tablet:btn-medium max-tablet:btn-small max-tablet:flex-1"
              onClick={handleBackStepClick}
              disabled={isFirstStep}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="desktop:w-80 tablet:w-55 desktop:btn-large tablet:btn-medium max-tablet:btn-small max-tablet:flex-1"
              onClick={handleNextStepClick}
              disabled={!currentAnswerId}
            >
              {isLastStep ? "Find your pet" : "Continue"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
