"use client";

import { ChangeEvent, MouseEvent, memo, useCallback, useRef } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { twMerge } from "@utils";
import { useController, useFormContext } from "react-hook-form";

import { Box, FormControl, FormHelperText, InputLabel } from "@portal/ui/atoms";
import { Close, FileFill, Plus } from "@portal/ui/icons";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

interface FileUploaderFieldEmptyProps {
  onClick: () => void;
  hasError?: boolean;
  placeholder: string;
}

const FileUploaderFieldEmpty = memo(
  ({ onClick, hasError, placeholder }: FileUploaderFieldEmptyProps) => (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "relative group box-border flex h-20 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-4 transition-colors hover:bg-light-aqua-green",
      )}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="11.25"
          ry="11.25"
          fill="none"
          stroke={hasError ? "#ef4444" : "#7E7E8B"}
          strokeWidth="1.5"
          strokeDasharray="2 2"
          strokeDashoffset="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Plus
        width={20}
        height={20}
        className="text-text-default group-hover:text-aqua-green h-5 w-5"
      />
      <span className="text-12 text-text-default group-hover:text-aqua-green font-semibold">
        {placeholder}
      </span>
    </button>
  ),
);

FileUploaderFieldEmpty.displayName = "FileUploaderFieldEmpty";

interface FileUploaderFieldFilledProps {
  value: File;
  onRemove: (e: MouseEvent) => void;
}

const FileUploaderFieldFilled = memo(
  ({ value, onRemove }: FileUploaderFieldFilledProps) => {
    const formatFileSize = (size: number) => {
      if (size === 0) {
        return "0 Bytes";
      }

      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(size) / Math.log(k));

      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
      <div className="border-border-light relative flex h-20 w-full items-center justify-between rounded-xl border bg-white px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-light-aqua-green flex h-12 w-12 items-center justify-center rounded-full shrink-0">
            <FileFill
              width={28}
              height={28}
              className="text-aqua-green h-7 w-7"
            />
          </div>
          <Box className="gap-1">
            <span className="text-18 text-text-default min-w-0 truncate font-semibold">
              {value.name}
            </span>
            <span className="text-14 text-text-default font-medium">
              {formatFileSize(value.size)}
            </span>
          </Box>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2 -right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#7E7E8B] transition-colors"
          aria-label="Remove file"
        >
          <Close className="h-3 w-3 text-white" />
        </button>
      </div>
    );
  },
);

FileUploaderFieldFilled.displayName = "FileUploaderFieldFilled";

export type FileUploaderFieldProps = {
  label?: string;
  name: string;
  placeholder: string;
};

export const FileUploaderField = ({
  label,
  name,
  placeholder,
}: FileUploaderFieldProps) => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const {
    field: { value, onChange },
  } = useController<Record<string, File | undefined>>({
    name,
    control,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;

      if (!file) {
        onChange(null);
        clearErrors(name);
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        e.target.value = "";

        setError(name, {
          type: "validate",
          message: "File must be 10 MB or smaller",
        });

        return;
      }

      clearErrors(name);
      onChange(file);
    },
    [clearErrors, name, onChange, setError],
  );

  const handleUploadClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      onChange(null);
      clearErrors(name);
    },
    [clearErrors, name, onChange],
  );

  return (
    <FormControl>
      {!!label && <InputLabel>{label}</InputLabel>}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/png,application/pdf"
      />
      {!value && (
        <FileUploaderFieldEmpty
          onClick={handleUploadClick}
          hasError={!!errors[name]}
          placeholder={placeholder}
        />
      )}
      {value && (
        <FileUploaderFieldFilled value={value} onRemove={handleRemoveFile} />
      )}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <FormHelperText error>{message}</FormHelperText>
        )}
      />
    </FormControl>
  );
};
