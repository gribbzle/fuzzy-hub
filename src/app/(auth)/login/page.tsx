import { AUTH_BACKGROUND_IMAGE_2 } from "@portal/auth/constants";
import { LoginForm } from "@portal/auth/ui/organisms";
import { TemplateAuthMain } from "@portal/auth/ui/templates";

const LoginPage = () => (
  <TemplateAuthMain backgroundImage={AUTH_BACKGROUND_IMAGE_2}>
    <LoginForm />
  </TemplateAuthMain>
);

export default LoginPage;
