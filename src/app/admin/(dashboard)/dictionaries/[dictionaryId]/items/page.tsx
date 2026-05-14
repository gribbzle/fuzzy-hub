"use client";

import { useParams } from "next/navigation";

import { AdminDictionaryItemsTable } from "../../_components/AdminDictionaryItemsTable";

const AdminDictionaryItemsPage = () => {
  const params = useParams<{ dictionaryId: string }>();
  const dictionaryId = decodeURIComponent(params.dictionaryId ?? "");

  return <AdminDictionaryItemsTable dictionaryId={dictionaryId} />;
};

export default AdminDictionaryItemsPage;
