import { API_BASE_URL } from "@constants";

export const getAttachmentUrl = (attachmentId: string) => {
  if (attachmentId.startsWith("/")) {
    return attachmentId;
  }

  return `${API_BASE_URL}/portal/attachments/${attachmentId}/content`;
};
