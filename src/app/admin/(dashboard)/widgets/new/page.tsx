"use client";

import { FormProvider } from "react-hook-form";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import {
  WidgetActiveSwitchField,
  WidgetTypeControllerField,
} from "../_components/WidgetFormFields";
import { WidgetFormFieldsBranch } from "../_components/WidgetFormFieldsBranch";
import { useAdminWidgetForm } from "../_hooks/useAdminWidgetForm";

const NewWidgetPage = () => {
  const {
    form,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    branchProps,
  } = useAdminWidgetForm({ mode: "create" });

  return (
    <FormProvider {...form}>
      <AdminEntityFormCard
        title="Add new widget"
        description="Pick a widget type and provide its content."
        submitError={submitError}
        submitIdleLabel="Create widget"
        submitPendingLabel="Creating..."
        isSubmitting={isSubmitting}
        fullWidth
        onSubmit={handleSubmit(onSubmit)}
        backHref="/admin"
        backLabel="Back to widgets"
      >
        <WidgetActiveSwitchField />
        <WidgetTypeControllerField />
        <WidgetFormFieldsBranch {...branchProps} />
      </AdminEntityFormCard>
    </FormProvider>
  );
};

export default NewWidgetPage;
