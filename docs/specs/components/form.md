# Form Component Specification

## Overview

The **Form** component is a context-enabled wrapper around `<form>` using `react-hook-form`. It integrates form state management via `FormProvider` and handles submission.

## API

| Prop        | Type                         | Default      | Description                                      |
| ----------- | ---------------------------- | ------------ | ------------------------------------------------ |
| `methods`   | `UseFormReturn<T>`           | **required** | React Hook Form methods (`useForm()` return).    |
| `onSubmit`  | `(data: T) => Promise<void>` | **required** | Submit handler receiving form values.            |
| `children`  | `ReactNode`                  | **required** | Form inputs/fields.                              |
| `className` | `string`                     | —            | Additional form classes merged.                  |
| `...rest`   | `FormHTMLAttributes`         | —            | Remaining native form props (except `onSubmit`). |

## Behavior

- Wraps children with `FormProvider` to enable `useFormContext`.
- `onSubmit` automatically receives validated form values via `methods.handleSubmit`.
- Renders `<form>` with `flex w-full flex-col gap-4`.

## Visual Design

- Column layout (`flex-col`) with 16px gaps.
- Full width by default.

## Accessibility

- Native `<form>` element semantics.
- Errors can be announced via RHF's `controller` + `aria-invalid` pattern.

## Testing Guidelines

- **Render**: verify `form` element with `flex flex-col gap-4`.
- **Submission**: test `onSubmit` receives correct typed data.
- **Context**: children can access form state via `useFormContext`.

## Usage Example

```tsx
import { useForm } from "react-hook-form";

import { Form } from "@portal/ui/atoms/data-display/Form";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const methods = useForm<LoginForm>();
  return (
    <Form methods={methods} onSubmit={handleLogin}>
      <TextInput {...methods.register("email")} />
      <TextInput type="password" {...methods.register("password")} />
      <Button type="submit">Log In</Button>
    </Form>
  );
}
```
