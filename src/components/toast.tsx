"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Individual Toast Item ────────────────────────────────────────────────────
const CONFIG: Record<ToastType, { icon: React.ReactNode; styles: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    styles:
      "bg-white border-l-4 border-emerald-500 shadow-emerald-100/80",
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    styles: "bg-white border-l-4 border-red-500 shadow-red-100/80",
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    styles: "bg-white border-l-4 border-blue-500 shadow-blue-100/80",
  },
};

function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { icon, styles } = CONFIG[t.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(t.id), 350);
    }, t.duration ?? 4000);

    return () => clearTimeout(timerRef.current);
  }, [t.id, t.duration, onDismiss]);

  const handleDismiss = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
    setTimeout(() => onDismiss(t.id), 350);
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-start gap-3 w-[340px] max-w-[calc(100vw-2rem)]
        px-4 py-3.5 rounded-xl shadow-lg border border-slate-100
        transition-all duration-350 ease-in-out
        ${styles}
        ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      {icon}
      <p className="text-[13.5px] font-semibold text-slate-800 leading-snug flex-1">
        {t.message}
      </p>
      <button
        onClick={handleDismiss}
        className="p-0.5 text-slate-400 hover:text-slate-700 transition-colors rounded shrink-0"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const value: ToastContextValue = {
    toast: addToast,
    success: (msg, dur) => addToast(msg, "success", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
    info: (msg, dur) => addToast(msg, "info", dur),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* ── Toast Container ── */}
      <div
        aria-label="Notifikasi"
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
