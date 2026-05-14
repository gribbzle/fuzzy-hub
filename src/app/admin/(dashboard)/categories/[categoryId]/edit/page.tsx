"use client";

import { useParams } from "next/navigation";

import { AdminCategoryEditForm } from "../../_components/AdminCategoryEditForm";

const EditCategoryPage = () => {
  const params = useParams<{ categoryId: string }>();
  const categoryId = decodeURIComponent(params.categoryId ?? "");

  return <AdminCategoryEditForm categoryId={categoryId} />;
};

export default EditCategoryPage;
