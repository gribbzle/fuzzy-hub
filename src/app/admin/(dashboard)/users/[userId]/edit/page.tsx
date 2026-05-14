"use client";

import { useParams } from "next/navigation";

import { AdminUserEditForm } from "../../_components/AdminUserEditForm";
import { AdminUserProfilesTable } from "../../_components/AdminUserProfilesTable";

const EditUserPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = decodeURIComponent(params.userId ?? "");

  return (
    <>
      <AdminUserEditForm userId={userId} />
      <AdminUserProfilesTable userId={userId} />
    </>
  );
};

export default EditUserPage;
