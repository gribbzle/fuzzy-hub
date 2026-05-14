"use client";

import { useParams } from "next/navigation";

import { AdminEntityFormCard } from "../../../_components/AdminEntityFormCard";
import { AdminEntityFormQueryState } from "../../../_components/AdminEntityFormQueryState";
import { formatAdminTableDate } from "../../../_components/adminTableUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../_components/ui/card";
import { QuizProfileFormFields } from "../../_components/QuizProfileFormFields";
import { QuizProfilePropertyWeightsForm } from "../../_components/QuizProfilePropertyWeightsForm";
import { useAdminQuizProfileForm } from "../../_hooks/useAdminQuizProfileForm";

const EditQuizProfilePage = () => {
  const params = useParams<{ quizProfileId: string }>();
  const quizProfileId = decodeURIComponent(params.quizProfileId ?? "");

  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
    profile,
  } = useAdminQuizProfileForm({ mode: "edit", quizProfileId });

  return (
    <>
      <AdminEntityFormCard
        title="Quiz profile"
        description="Update the display name. Property weights are edited below."
        fullWidth
        submitError={submitError}
        submitIdleLabel="Save profile"
        submitPendingLabel="Saving..."
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        backHref="/admin/quiz-profiles"
        backLabel="Back to quiz profiles"
      >
        <AdminEntityFormQueryState
          loadError={loadError}
          loadErrorFallback="Failed to load quiz profile."
          isLoading={isLoading}
          loadingMessage="Loading profile..."
          canRender
          showNonBlockingError
          showLoadingWhileRenderable={!profile}
        >
          <QuizProfileFormFields
            control={control}
            errors={errors}
            quizProfileId={quizProfileId}
            showQuizProfileId
          />
        </AdminEntityFormQueryState>
      </AdminEntityFormCard>

      {profile ? (
        <div className="p-4 sm:p-6">
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Metadata</CardTitle>
                <CardDescription>
                  Read-only timestamps from the server.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-600">
                  <span>
                    Created{" "}
                    <time dateTime={profile.created_at}>
                      {formatAdminTableDate(profile.created_at)}
                    </time>
                  </span>
                  <span>
                    Updated{" "}
                    <time dateTime={profile.updated_at}>
                      {formatAdminTableDate(profile.updated_at)}
                    </time>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}

      <QuizProfilePropertyWeightsForm quizProfileId={quizProfileId} />
    </>
  );
};

export default EditQuizProfilePage;
