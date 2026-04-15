"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Announcement } from "@/modules/announcement/types";
import { ChevronRight, Calendar, Sparkles, Check, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
      return "bg-rose-500/90 text-white border-rose-400";
    case "Pemerintah":
      return "bg-blue-600/90 text-white border-blue-500";
    case "Kegiatan":
      return "bg-emerald-500/90 text-white border-emerald-400";
    case "Umum":
      return "bg-slate-700/90 text-white border-slate-600";
    default:
      return "bg-slate-700/90 text-white border-slate-600";
  }
};

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

  useEffect(() => {
    const setItemsPerPageByScreen = () => {
      const isMobile = window.innerWidth < 1024;
      setItemsPerPage(isMobile ? 3 : 6);
    };

    setItemsPerPageByScreen();
    window.addEventListener("resize", setItemsPerPageByScreen);
    return () => window.removeEventListener("resize", setItemsPerPageByScreen);
  }, []);

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
    <div className="space-y-8 mt-4 lg:mt-8 border-t border-slate-200/80 pt-10">
      
      {/* Header Infobar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold tracking-widest uppercase">
             <Sparkles className="w-3 h-3 text-slate-400" /> Referensial
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Arsip & Risalah Berita
          </h2>
          <p className="text-[16px] text-slate-500 max-w-xl leading-relaxed font-medium">
            Kumpulan komprehensif riwayat publikasi dokumen, kegiatan, dan kebijakan administrasi dusun.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-500 tracking-wide">
               Ditampilkan: <span className="text-emerald-600">{announcements.length}</span> / <span className="text-slate-900">{totalCount}</span> Arsip
             </p>
          </div>
        </div>
      </div>

      {/* Grid Kartu Berita */}
      <motion.div 
        layout 
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-2"
      >
        <AnimatePresence mode="popLayout">
          {announcements.map((announcement, idx) => (
            <motion.article
              layout
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % itemsPerPage) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-300 cursor-pointer transition-all duration-300"
              onClick={() => window.location.href = `/pengumuman/${announcement.id}`}
            >
              {/* Image Area with Absolute Category Tag */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 right-4 z-20">
                   <span className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-sm ${getCategoryColor(announcement.category)}`}>
                     {announcement.category}
                   </span>
                </div>

                {announcement.imageUrl ? (
                  <Image
                    src={announcement.imageUrl}
                    alt={announcement.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-50 text-slate-400">
                    <span className="text-[11px] font-bold tracking-widest uppercase">N/A Dokumentasi</span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1 relative bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                    {formatDate(announcement.createdAt)}
                  </span>
                </div>

                <h3 className="text-[20px] font-bold text-slate-900 leading-[1.3] line-clamp-2 group-hover:text-emerald-700 transition-colors mb-3">
                  {announcement.title}
                </h3>

                <p className="text-[14px] text-slate-500 line-clamp-3 leading-relaxed flex-1 font-medium">
                  {announcement.content}
                </p>

                {/* Stats: Views & Likes */}
                <div className="flex items-center gap-4 mt-4 mb-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-semibold">{announcement.views.toLocaleString("id-ID")} dibaca</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-semibold">{announcement.likes.toLocaleString("id-ID")} suka</span>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                    Baca Selengkapnya
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modern Skeleton Loader for Intersection Observer */}
      <div ref={observerRef} className="flex flex-col items-center justify-center pt-8 pb-16">
        {isLoading && (
          <div className="w-full">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               {[1, 2, 3].map((skeleton) => (
                  <div key={`skel-${skeleton}`} className="flex flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-sm p-4 animate-pulse">
                     <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl mb-6" />
                     <div className="h-3 w-1/4 bg-slate-100 rounded-full mb-4" />
                     <div className="space-y-2 mb-4">
                       <div className="h-5 w-full bg-slate-100 rounded-md" />
                       <div className="h-5 w-5/6 bg-slate-100 rounded-md" />
                     </div>
                     <div className="space-y-2 mb-6">
                       <div className="h-3 w-full bg-slate-50 rounded-md" />
                       <div className="h-3 w-4/5 bg-slate-50 rounded-md" />
                     </div>
                     <div className="mt-auto h-4 w-1/3 bg-slate-100 rounded-full" />
                  </div>
               ))}
            </div>
          </div>
        )}

        {!hasMore && announcements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center py-10 gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Semua berita telah ditampilkan
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
