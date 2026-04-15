"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleAnnouncementLike } from "./actions";
import { useToast } from "@/components/toast";

interface LikeButtonProps {
  announcementId: string;
  initialLikes: number;
  initialHasLiked: boolean;
}

export function LikeButton({ announcementId, initialLikes, initialHasLiked }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [isPending, startTransition] = useTransition();
  const { success, error: toastError, info } = useToast();

  const handleLike = () => {
    const prevLikes = likes;
    const prevHasLiked = hasLiked;

    // Optimistic UI update
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    setHasLiked(!hasLiked);

    startTransition(async () => {
      const result = await toggleAnnouncementLike(announcementId);

      if ("error" in result && result.error) {
        // Revert optimistic update
        setLikes(prevLikes);
        setHasLiked(prevHasLiked);
        toastError(result.error);
        return;
      }

      if ("liked" in result) {
        setLikes(result.totalLikes);
        setHasLiked(result.liked);
        if (result.liked) {
          success("Terima kasih! Pengumuman ini ditandai bermanfaat.");
        } else {
          info("Like berhasil dibatalkan.");
        }
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      aria-label={hasLiked ? "Batalkan like" : "Like pengumuman ini"}
      className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full border transition-all duration-200 group disabled:opacity-60 disabled:cursor-not-allowed ${
        hasLiked
          ? "bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm"
          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
      }`}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          hasLiked
            ? "fill-emerald-500 text-emerald-500 scale-110"
            : "group-hover:fill-emerald-200 group-hover:text-emerald-500"
        }`}
      />
      <span>Bermanfaat ({likes})</span>
    </button>
  );
}
