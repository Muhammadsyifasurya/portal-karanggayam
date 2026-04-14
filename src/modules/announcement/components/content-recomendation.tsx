"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Announcement } from "@/modules/announcement/types";
import { ChevronRight, Loader2, Calendar } from "lucide-react";
import Image from "next/image";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Kesehatan":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "Pemerintah":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Kegiatan":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Umum":
      return "bg-slate-50 text-slate-700 border-slate-200";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

// Deduplicate announcements by ID
const deduplicateAnnouncements = (
  announcements: Announcement[],
): Announcement[] => {
  const seen = new Set<string>();
  return announcements.filter((announcement) => {
    if (seen.has(announcement.id)) {
      return false;
    }
    seen.add(announcement.id);
    return true;
  });
};

interface ContentRecommendationProps {
  announcements: Announcement[];
  totalCount: number;
  activeTab?: string;
}

export function ContentRecommendation({
  announcements: initialAnnouncements,
  totalCount,
  activeTab = "Semua",
}: ContentRecommendationProps) {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialAnnouncements.length < totalCount,
  );
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const observerRef = useRef<HTMLDivElement>(null);

  // Detect screen size and set items per page
  useEffect(() => {
    const setItemsPerPageByScreen = () => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      setItemsPerPage(isMobile ? 3 : 6);
    };

    setItemsPerPageByScreen();
    window.addEventListener("resize", setItemsPerPageByScreen);
    return () => window.removeEventListener("resize", setItemsPerPageByScreen);
  }, []);

  // Reset announcements when activeTab or initialAnnouncements change
  useEffect(() => {
    const deduped = deduplicateAnnouncements(initialAnnouncements);
    setAnnouncements(deduped);
    setHasMore(deduped.length < totalCount);
  }, [activeTab, initialAnnouncements, totalCount]);

  const loadMoreAnnouncements = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const categoryParam = activeTab !== "Semua" ? `&category=${activeTab}` : "";
      const response = await fetch(
        `/api/announcements?limit=${itemsPerPage}&offset=${announcements.length}${categoryParam}`,
      );
      if (!response.ok) throw new Error("Gagal mengambil sisa berita");

      const newAnnouncements: Announcement[] = await response.json();
      setAnnouncements((prev) => {
        const combined = [...prev, ...newAnnouncements];
        return deduplicateAnnouncements(combined);
      });
      setHasMore(newAnnouncements.length === itemsPerPage);
    } catch (error) {
      console.error("Error memuat pengumuman:", error);
    } finally {
      setIsLoading(false);
    }
  }, [announcements.length, hasMore, isLoading, itemsPerPage, activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreAnnouncements();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreAnnouncements, hasMore, isLoading]);

  return (
    <div className="space-y-6 mt-1 lg:mt-4 border-t border-slate-200 pt-10">
      {/* Header Infobar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Arsip Berita & Agenda
          </h2>
          <p className="text-[15px] text-slate-500 max-w-lg">
            Akses seluruh riwayat publikasi dokumen dan kegiatan dari administrasi dusun Karanggayam.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60 shadow-sm">
             <p className="text-xs font-bold text-slate-500">
               Menampilkan <span className="text-emerald-700">{announcements.length}</span> dari <span className="text-slate-900">{totalCount}</span> Dokumen
             </p>
          </div>
        </div>
      </div>

      {/* Grid Kartu Berita */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2">
        {announcements.map((announcement) => (
          <article
            key={announcement.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 cursor-pointer"
            onClick={() => window.location.href = `/pengumuman/${announcement.id}`}
          >
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {announcement.imageUrl ? (
                <Image
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-50 text-slate-400">
                  <span className="text-[10px] font-bold tracking-wider uppercase">Tanpa Dokumentasi</span>
                </div>
              )}
            </div>

            <div className="space-y-4 p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border ${getCategoryColor(announcement.category)}`}
                >
                  {announcement.category}
                </span>
                <span className="text-[12px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(announcement.createdAt)}
                </span>
              </div>

              <h3 className="text-[19px] font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
                {announcement.title}
              </h3>

              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-1">
                {announcement.content}
              </p>

              <div className="pt-5 mt-auto">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  Akses Dokumen
                  <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Loading indicator and intersection observer trigger */}
      <div ref={observerRef} className="flex justify-center pt-8 pb-16">
        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-600 font-semibold text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Sinkronisasi data arsip...
          </div>
        )}
        {!hasMore && announcements.length > 0 && (
          <div className="text-center text-slate-400 font-medium text-sm">
            <p>Berhasil menampilkan seluruh catatan arsip.</p>
          </div>
        )}
      </div>
    </div>
  );
}
