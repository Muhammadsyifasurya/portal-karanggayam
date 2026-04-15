"use client";

import { useState } from "react";
import { Announcement } from "@/modules/announcement/types";
import { ChevronRight, Search, Calendar, Sparkles, Megaphone, AlertCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const tabOptions = ["Semua", "Umum", "Pemerintah", "Kegiatan", "Kesehatan"] as const;
type TabOption = (typeof tabOptions)[number];

interface AnnouncementPageClientProps {
  announcements: Announcement[];
  activeTab: TabOption;
  searchQuery: string;
  onActiveTabChange: (tab: TabOption) => void;
  onSearchQueryChange: (query: string) => void;
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short", // Lebih ringkas untuk tampilan bento
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

export function AnnouncementPageClient({
  announcements,
  activeTab,
  searchQuery,
  onActiveTabChange,
  onSearchQueryChange,
}: AnnouncementPageClientProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const featuredAnnouncements = announcements.filter((a) => a.isFeatured);
  const featuredAnnouncement = featuredAnnouncements.length > 0 ? featuredAnnouncements[0] : announcements[0];

  const urgentAnnouncement = announcements.find((a) => a.isUrgent);

  const sidebarAnnouncements = announcements
    .filter((a) => a.id !== featuredAnnouncement?.id)
    .slice(0, 1);

  return (
    <section className="space-y-12">
      {/* --- HEADER PROFESIONAL (ENTERPRISE) --- */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto pb-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-[11px] font-bold tracking-widest uppercase mb-6"
        >
          <Megaphone className="w-3.5 h-3.5 text-slate-500" />
          Pusat Informasi Eksekutif
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[56px] font-black text-slate-900 tracking-tight mb-5 leading-tight"
        >
          Kabar Dusun
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 leading-relaxed font-medium"
        >
          Portal resmi administrasi dusun. Menyajikan informasi terkini, agenda strategis, dan rilis pemerintahan secara transparan dan tepercaya.
        </motion.p>
      </div>

      {/* --- KONTROL FILTER & PENCARIAN (Animated Segmented Tabs) --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200/80">
        
        {/* Animated Segmented Tabs */}
        <div className="relative flex overflow-x-auto hide-scrollbar gap-1 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60">
          {tabOptions.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onActiveTabChange(tab)}
                className={`relative px-5 py-2.5 text-[14px] font-bold transition-colors duration-300 rounded-xl whitespace-nowrap ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/50"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Kotak Pencarian Floating/Expanding */}
        <div className={`relative transition-all duration-300 ease-out ${isSearchFocused ? "w-full lg:w-[350px]" : "w-full lg:w-[280px]"}`}>
          <div className={`absolute inset-0 bg-emerald-500/5 rounded-2xl blur-md transition-opacity duration-300 ${isSearchFocused ? "opacity-100" : "opacity-0"}`} />
          <div className={`relative flex items-center bg-white rounded-2xl border transition-colors duration-300 ${isSearchFocused ? "border-emerald-400/50 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]" : "border-slate-200 shadow-sm"}`}>
            <Search className={`absolute left-4 h-4 w-4 transition-colors ${isSearchFocused ? "text-emerald-500" : "text-slate-400"}`} />
            <input
              type="text"
              placeholder="Cari arsip dokumen..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full bg-transparent py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* --- BENTO GRID: HERO SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        
        {/* BENTO MAIN: Sorotan Utama (Kiri, 8 Kolom) */}
        <div className="lg:col-span-8 flex flex-col group h-full">
          {featuredAnnouncement ? (
            <motion.article 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-[24px] bg-slate-900 shadow-xl flex flex-col h-[400px] sm:h-[500px]"
            >
              {featuredAnnouncement.imageUrl && (
                <Image
                  src={featuredAnnouncement.imageUrl}
                  alt={featuredAnnouncement.title}
                  fill
                  priority
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 mix-blend-overlay"
                />
              )}
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
              
              {/* Tags Floating Top */}
              <div className="absolute top-6 left-6 z-20 flex gap-2">
                 <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-100 border border-emerald-400/30">
                    <Sparkles className="w-3.5 h-3.5" /> Fokus Utama
                 </span>
              </div>

              {/* Content Bottom */}
              <div className="relative z-20 mt-auto p-6 sm:p-10 w-full lg:w-4/5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    {featuredAnnouncement.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(featuredAnnouncement.createdAt)}
                  </span>
                </div>
                
                <a href={`/pengumuman/${featuredAnnouncement.id}`} className="block group-hover:underline decoration-emerald-400/50 underline-offset-8 decoration-2">
                  <h2 className="text-2xl sm:text-4xl font-black leading-[1.15] text-white mb-4">
                    {featuredAnnouncement.title}
                  </h2>
                </a>
                
                <p className="text-base text-slate-300 line-clamp-2 md:line-clamp-3 mb-6 leading-relaxed max-w-2xl font-medium">
                  {featuredAnnouncement.content}
                </p>
                
                <a
                  href={`/pengumuman/${featuredAnnouncement.id}`}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                >
                  Tinjau Keputusan
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ) : (
             <div className="rounded-[24px] border border-slate-200 bg-slate-50 flex items-center justify-center h-[500px]">
                <p className="text-slate-400 font-semibold">Belum ada tayangan utama.</p>
             </div>
          )}
        </div>

        {/* BENTO SIDE: Kanan, 4 Kolom (Stack 2 row) */}
        <div className="lg:col-span-4 flex flex-col gap-5 lg:gap-6 h-full">
          
          {/* Maklumat Mendesak (Atas Kanan) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`flex-1 rounded-[24px] p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden group ${
              urgentAnnouncement 
                ? "bg-gradient-to-br from-rose-50 to-white text-slate-900 border border-rose-200 shadow-[0_8px_30px_rgb(225,29,72,0.06)]"
                : "bg-slate-50 border border-slate-200 text-slate-500"
            }`}
          >
            {urgentAnnouncement && (
               <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10">
                 <AlertCircle className="w-24 h-24 text-rose-600 rotate-12" />
               </div>
            )}
            
            <div className="mb-5 flex items-center gap-2.5 relative z-10">
              {urgentAnnouncement ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  </span>
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-rose-600">Instruksi Darurat</h3>
                </>
              ) : (
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Status Keamanan</h3>
              )}
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {urgentAnnouncement ? (
                <>
                  <a href={`/pengumuman/${urgentAnnouncement.id}`}>
                    <h4 className="text-[20px] font-black leading-[1.2] mb-3 group-hover:text-rose-700 transition-colors">
                      {urgentAnnouncement.title}
                    </h4>
                  </a>
                  <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 font-medium">
                    {urgentAnnouncement.content}
                  </p>
                </>
              ) : (
                <>
                  <h4 className="text-[20px] font-bold mb-2">Terkendali</h4>
                  <p className="text-sm leading-relaxed">Seluruh operasional dusun berjalan dalam kondisi kondusif. Tidak ada maklumat khusus diterbitkan.</p>
                </>
              )}
            </div>
          </motion.div>

          {/* Agenda Eksekutif (Bawah Kanan) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.4, delay: 0.2 }}
             className="flex-1 rounded-[24px] border border-slate-200 bg-white p-6 lg:p-8 shadow-sm flex flex-col justify-between group cursor-pointer hover:border-slate-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
             onClick={() => sidebarAnnouncements[0] && (window.location.href = `/pengumuman/${sidebarAnnouncements[0].id}`)}
          >
            {sidebarAnnouncements.length > 0 ? (
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                   <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors">
                     <Calendar className="h-5 w-5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-200 px-2.5 py-1 rounded-md">
                     Agenda Mendatang
                   </span>
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                  {sidebarAnnouncements[0].title}
                </h3>
                <p className="text-[13px] font-medium leading-relaxed text-slate-500 line-clamp-2">
                  {sidebarAnnouncements[0].content}
                </p>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 mb-5">
                   <Calendar className="h-5 w-5 text-slate-400" />
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 mb-2">Jadwal Kosong</h3>
                <p className="text-[13px] font-medium text-slate-500 line-clamp-2">Agenda publik berikutnya sedang dalam penyusunan oleh perangkat dusun.</p>
              </div>
            )}
            
            {sidebarAnnouncements.length > 0 && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                  Lihat Detail Jadwal
                  <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

