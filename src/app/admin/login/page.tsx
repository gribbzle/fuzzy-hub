"use client";

import { useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  clearCurrentProfileIdCookie,
  clearProfilesCookie,
  setCurrentProfileIdCookie,
  setProfilesCookie,
} from "@/utils/authCookie";
import { LoginRequest, useLoginMutation } from "@admin/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// TODO: убрать зависимость от portal
import { loginSchema } from "@portal/auth/schemas";

import { Button } from "../(dashboard)/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../(dashboard)/_components/ui/card";
import { FormField } from "../(dashboard)/_components/ui/form-field";
import { Input } from "../(dashboard)/_components/ui/input";

const loginDefaultValues: LoginRequest = {
  email: "",
  password: "",
};

const AdminLoginPage = () => {
  const router = useRouter();
  const { trigger, isMutating } = useLoginMutation();

  const { control, handleSubmit, formState, setError, setFocus } =
    useForm<LoginRequest>({
      resolver: zodResolver(loginSchema),
      defaultValues: loginDefaultValues,
    });

  const { errors } = formState;

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = useCallback(
    async (request: LoginRequest) => {
      try {
        const result = await trigger(request);
        const profiles = result.data?.profiles;

        if (profiles?.length) {
          setProfilesCookie(profiles);
          const adminProfile = profiles.find((p) => p.type === "admin");
          if (adminProfile) {
            setCurrentProfileIdCookie(adminProfile.public_id);
          } else {
            clearCurrentProfileIdCookie();
          }
        } else {
          clearProfilesCookie();
          clearCurrentProfileIdCookie();
        }

        router.push("/admin");
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          (error as Error & { status?: number }).status === 401
        ) {
          setError("email", {
            type: "manual",
            message: "Incorrect email or password",
          });
          setError("password", {
            type: "manual",
            message: "Incorrect email or password",
          });
        }
      }
    },
    [trigger, router, setError],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50/80 p-4 text-zinc-900">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Admin</CardTitle>
              <CardDescription>Sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                id="admin-login-email"
                label="Email"
                labelClassName="text-zinc-900"
                errorMessage={errors.email?.message}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="admin-login-email"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  )}
                />
              </FormField>
              <FormField
                id="admin-login-password"
                label="Password"
                labelClassName="text-zinc-900"
                errorMessage={errors.password?.message}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="admin-login-password"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  )}
                />
              </FormField>
              <Button type="submit" className="w-full" disabled={isMutating}>
                {isMutating ? "Signing in…" : "Sign in"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
