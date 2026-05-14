import { BannerSearchByPMQ, QuizStepper } from "@portal/market/ui/organisms";
import {
  TemplateQuizContainer,
  TemplateQuizMain,
} from "@portal/market/ui/templates";

import quizStepperMock from "./_mocks/quizStepper.mock";

const PetsMatchingQuizDemoPage = () => (
  <TemplateQuizMain>
    <TemplateQuizContainer>
      <BannerSearchByPMQ
        title="Find your perfect furry match"
        text={
          "Find your perfect companion in 3 minutes\nAnswer a few simple questions and discover pets that truly match your lifestyle"
        }
      />
      <QuizStepper quiz={quizStepperMock} />
    </TemplateQuizContainer>
  </TemplateQuizMain>
);

export default PetsMatchingQuizDemoPage;
