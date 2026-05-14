"use client";

import { useParams } from "next/navigation";

import { FormProvider } from "react-hook-form";

import { AdminEntityFormCard } from "../../../_components/AdminEntityFormCard";
import { AdminEntityFormQueryState } from "../../../_components/AdminEntityFormQueryState";
import {
  WidgetActiveSwitchField,
  WidgetTypeControllerField,
} from "../../_components/WidgetFormFields";
import { WidgetFormFieldsBranch } from "../../_components/WidgetFormFieldsBranch";
import { useAdminWidgetForm } from "../../_hooks/useAdminWidgetForm";

const EditWidgetPage = () => {
  const params = useParams<{ widgetId: string }>();
  const widgetId = decodeURIComponent(params.widgetId ?? "");

  const {
    form,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    branchProps,
    loadError,
    isLoading,
  } = useAdminWidgetForm({ mode: "edit", widgetId });

  return (
    <FormProvider {...form}>
      <AdminEntityFormCard
        title="Edit widget"
        description="Update widget content."
        submitError={submitError}
        submitIdleLabel="Save changes"
        submitPendingLabel="Saving..."
        isSubmitting={isSubmitting}
        fullWidth
        onSubmit={handleSubmit(onSubmit)}
        backHref="/admin"
        backLabel="Back to widgets"
      >
        <AdminEntityFormQueryState
          loadError={loadError}
          loadErrorFallback="Failed to load widget."
          isLoading={isLoading}
          loadingMessage="Loading widget details..."
          canRender
          showNonBlockingError
          showLoadingWhileRenderable
        >
          <WidgetActiveSwitchField />
          <WidgetTypeControllerField disabled />
          <WidgetFormFieldsBranch {...branchProps} />
        </AdminEntityFormQueryState>
      </AdminEntityFormCard>
    </FormProvider>
  );
};

export default EditWidgetPage;
