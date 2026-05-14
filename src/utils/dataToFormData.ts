export function dataToFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          formData.append(key + "[]", String(item));
        }
      }

      continue;
    }

    formData.append(key, String(value));
  }

  return formData;
}