import { AUTH_BACKGROUND_IMAGE_2 } from "@portal/auth/constants";
import { PasswordRecoveryStepper } from "@portal/auth/ui/organisms";
import { TemplateAuthMain } from "@portal/auth/ui/templates";

const PasswordRecoveryPage = () => (
  <TemplateAuthMain backgroundImage={AUTH_BACKGROUND_IMAGE_2}>
    <PasswordRecoveryStepper />
  </TemplateAuthMain>
);

export default PasswordRecoveryPage;
