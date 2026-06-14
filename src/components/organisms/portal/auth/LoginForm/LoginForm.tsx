"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginWithSanctum,
  oauthLoginWithSanctum,
} from "@lib/api/sanctum-client";
import { useForm } from "react-hook-form";

import { Alert, Box, Form, Link } from "@portal/ui/atoms";
import { PasswordField, SubmitButton, TextField } from "@portal/ui/molecules";

import { LoginResponse, OAuthLoginParams } from "@portal/auth/models";
import { LoginFormValues, loginSchema } from "@portal/auth/schemas";
import { FacebookButton, GoogleButton } from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

export interface LoginFormProps {
  onLogin?: (formValues: LoginFormValues) => Promise<LoginResponse>;
  onOAuthLogin?: (params: OAuthLoginParams) => Promise<LoginResponse>;
}

export const LoginForm = ({ onLogin, onOAuthLogin }: LoginFormProps) => {
  const router = useRouter();

  const [serverError, setServerError] = useState(false);

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    methods.setFocus("email");
  }, [methods]);

  const handleLoginResponse = useCallback(
    async (response?: LoginResponse) => {
      if (!response) {
        return;
      }

      if (response.error) {
        if (response.error.type === "InvalidCredentials") {
          methods.setError("email", {
            type: "manual",
            message: "Incorrect email or password",
          });
        }

        setServerError(response.error.status === 500);

        return;
      }

      setServerError(false);

      router.push("./");
    },
    [methods, router],
  );

  const handleLogin = useCallback(
    async (formValues: LoginFormValues) => {
      const response = onLogin
        ? await onLogin(formValues)
        : await loginWithSanctum(formValues);

      await handleLoginResponse(response);
    },
    [onLogin, handleLoginResponse],
  );

  const handleOAuthLogin = useCallback(
    async (provider: "google" | "meta", accessToken: string) => {
      const response = onOAuthLogin
        ? await onOAuthLogin({
            provider,
            oauth_token: accessToken,
          })
        : await oauthLoginWithSanctum({
            provider,
            oauth_token: accessToken,
          });

      await handleLoginResponse(response);
    },
    [onOAuthLogin, handleLoginResponse],
  );

  return (
    <TemplateAuthContent className="max-tablet:py-8 max-tablet:pb-10.5">
      <TemplateAuthContentHeader
        title="Welcome back!"
        subtitle="Please enter your details to continue"
      />
      <TemplateAuthContentForm className="large-desktop:mx-2.5">
        <Form
          id="login-form"
          methods={methods}
          onSubmit={handleLogin}
          noValidate
        >
          <TextField label="Email" type="email" name="email" />
          <Box className="large-desktop:gap-2 gap-1 max-tablet:gap-2">
            <PasswordField label="Password" name="password" />
            <Link
              href="./password-recovery"
              className="large-desktop:text-18 text-16 text-primary self-end font-bold"
            >
              Forgot Password?
            </Link>
          </Box>
          {serverError && (
            <Alert size="medium" severity="error" title="Something went wrong">
              Request failed. Please try again. If the problem continues,
              contact support.
            </Alert>
          )}
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <SubmitButton form="login-form" formState={methods.formState}>
          Log In
        </SubmitButton>
        <span className="text-16 text-text-secondary font-semibold max-tablet:text-14 text-center">
          -&nbsp;&nbsp;OR&nbsp;&nbsp;-
        </span>
        <Box className="flex-row justify-center gap-5">
          <GoogleButton onSuccess={handleOAuthLogin} />
          <FacebookButton />
        </Box>
        <Box className="flex-row gap-1.5 justify-center">
          <p className="large-desktop:text-18 text-16 text-text-secondary text-center font-semibold">
            Don’t have an account?
          </p>
          <Link
            className="large-desktop:text-18 text-16 text-center"
            href="./sign-up"
          >
            Sign Up
          </Link>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};
