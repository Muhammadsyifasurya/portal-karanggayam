"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/toast";

interface ShareButtonProps {
  variant?: "icon" | "sidebar";
}

export function ShareButton({ variant = "icon" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      success("Tautan berhasil disalin ke clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      error("Gagal menyalin tautan. Coba lagi.");
    }
  };

  if (variant === "sidebar") {
    return (
      <button
        onClick={handleCopy}
        className="flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-all text-sm border border-slate-200 w-full"
        aria-label="Salin tautan"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-600">Disalin!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Salin Tautan
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-full border border-slate-200 transition-all"
      aria-label="Salin tautan"
      title={copied ? "Disalin!" : "Salin tautan"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
    </button>
  );
}
