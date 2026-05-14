"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@utils";

interface AdminNotificationOptions {
  durationMs?: number;
}

interface AdminNotificationItem {
  id: number;
  message: string;
  kind: "success" | "error";
  durationMs: number;
}

interface AdminNotificationsContextValue {
  notifySuccess: (
    message: string,
    options?: AdminNotificationOptions,
  ) => number;
  notifyError: (message: string, options?: AdminNotificationOptions) => number;
  dismissNotification: (id: number) => void;
}

const DEFAULT_NOTIFICATION_DURATION_MS = 4000;

const AdminNotificationsContext =
  createContext<AdminNotificationsContextValue | null>(null);

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
}

function AdminNotificationToast({
  item,
  onClose,
}: {
  item: AdminNotificationItem;
  onClose: (id: number) => void;
}) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onClose(item.id);
    }, item.durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [item.durationMs, item.id, onClose]);

  const isSuccess = item.kind === "success";
  const Icon = isSuccess ? CheckCircleIcon : AlertCircleIcon;

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={cn(
        "pointer-events-auto relative flex w-full max-w-sm items-start gap-3 rounded-md border border-zinc-200 bg-white p-4 pr-10 shadow-lg",
        isSuccess
          ? "border-l-4 border-l-emerald-500"
          : "border-l-4 border-l-red-500",
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 shrink-0",
          isSuccess ? "text-emerald-600" : "text-red-600",
        )}
      />
      <p className="text-sm font-medium text-zinc-800">{item.message}</p>
      <button
        type="button"
        aria-label="Close notification"
        onClick={() => onClose(item.id)}
        className="absolute top-2 right-2 cursor-pointer rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export function AdminNotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const idRef = useRef(0);
  const [notifications, setNotifications] = useState<AdminNotificationItem[]>(
    [],
  );

  const dismissNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (
      kind: "success" | "error",
      message: string,
      options?: AdminNotificationOptions,
    ) => {
      idRef.current += 1;
      const nextId = idRef.current;
      const durationMs =
        options?.durationMs ?? DEFAULT_NOTIFICATION_DURATION_MS;

      setNotifications((prev) => [
        ...prev,
        {
          id: nextId,
          kind,
          message,
          durationMs,
        },
      ]);

      return nextId;
    },
    [],
  );

  const notifySuccess = useCallback(
    (message: string, options?: AdminNotificationOptions) =>
      notify("success", message, options),
    [notify],
  );

  const notifyError = useCallback(
    (message: string, options?: AdminNotificationOptions) =>
      notify("error", message, options),
    [notify],
  );

  const contextValue = useMemo(
    () => ({
      notifySuccess,
      notifyError,
      dismissNotification,
    }),
    [dismissNotification, notifyError, notifySuccess],
  );

  return (
    <AdminNotificationsContext.Provider value={contextValue}>
      {children}
      <div className="pointer-events-none fixed top-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3">
        {notifications.map((item) => (
          <AdminNotificationToast
            key={item.id}
            item={item}
            onClose={dismissNotification}
          />
        ))}
      </div>
    </AdminNotificationsContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationsContext);
  if (context) {
    return context;
  }
  throw new Error(
    "useAdminNotifications must be used within an AdminNotificationsProvider.",
  );
}
