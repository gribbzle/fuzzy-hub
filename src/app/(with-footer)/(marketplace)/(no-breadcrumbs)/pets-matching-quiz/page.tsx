import {
  getPetsMatchingQuizAction,
  submitQuizAnswersAction,
} from "@portal/market/actions";
import { BannerSearchByPMQ, QuizStepper } from "@portal/market/ui/organisms";
import {
  TemplateQuizContainer,
  TemplateQuizMain,
} from "@portal/market/ui/templates";

const PetsMatchingQuizPage = async () => {
  const { data: quiz } = await getPetsMatchingQuizAction();

  return (
    <TemplateQuizMain>
      <TemplateQuizContainer>
        <BannerSearchByPMQ
          title="Find your perfect furry match"
          text={
            "Find your perfect companion in 3 minutes\nAnswer a few simple questions and discover pets that truly match your lifestyle"
          }
        />
        {!!quiz && (
          <QuizStepper
            quiz={quiz.items[0]}
            onNextStep={submitQuizAnswersAction}
          />
        )}
      </TemplateQuizContainer>
    </TemplateQuizMain>
  );
};

export default PetsMatchingQuizPage;
