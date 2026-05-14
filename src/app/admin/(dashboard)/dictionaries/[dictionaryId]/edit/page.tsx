"use client";

import { useParams } from "next/navigation";

import { AdminDictionaryEditForm } from "../../_components/AdminDictionaryEditForm";
import { AdminDictionaryItemsTable } from "../../_components/AdminDictionaryItemsTable";

const EditDictionaryPage = () => {
  const params = useParams<{ dictionaryId: string }>();
  const dictionaryId = decodeURIComponent(params.dictionaryId ?? "");

  return (
    <>
      <AdminDictionaryEditForm dictionaryId={dictionaryId} />
      <AdminDictionaryItemsTable dictionaryId={dictionaryId} />
    </>
  );
};

export default EditDictionaryPage;
