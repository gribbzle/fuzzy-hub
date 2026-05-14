"use client";

import { useParams } from "next/navigation";

import { AdminCharacteristicEditForm } from "../../_components/AdminCharacteristicEditForm";

const EditCharacteristicPage = () => {
  const params = useParams<{ characteristicId: string }>();
  const characteristicId = decodeURIComponent(params.characteristicId ?? "");

  return <AdminCharacteristicEditForm characteristicId={characteristicId} />;
};

export default EditCharacteristicPage;
