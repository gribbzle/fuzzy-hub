import { AUTH_BACKGROUND_IMAGE_1 } from "@portal/auth/constants";
import { RegistrationStepper } from "@portal/auth/ui/organisms";
import { TemplateAuthMain } from "@portal/auth/ui/templates";

const SignUpDemoPage = () => (
  <TemplateAuthMain backgroundImage={AUTH_BACKGROUND_IMAGE_1}>
    <RegistrationStepper />
  </TemplateAuthMain>
);

export default SignUpDemoPage;
