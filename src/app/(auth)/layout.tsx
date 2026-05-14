import { ReactNode } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <GoogleOAuthProvider
    clientId={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN ?? ""}
  >
    {children}
  </GoogleOAuthProvider>
);

export default AuthLayout;
