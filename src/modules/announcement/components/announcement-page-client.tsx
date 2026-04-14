"use client";

import { Announcement } from "@/modules/announcement/types";
import { ChevronRight, Search, Calendar, Sparkles, Megaphone } from "lucide-react";
import Image from "next/image";

// Teks filter yang akan ditampilkan (DB categories mungkin berbeda, sesuaikan jika perlu)
const tabOptions = ["Semua", "Umum", "Pemerintah", "Kegiatan", "Kesehatan"] as const;
type TabOption = (typeof tabOptions)[number];

interface AnnouncementPageClientProps {
  announcements: Announcement[];
  activeTab: TabOption;
  searchQuery: string;
  onActiveTabChange: (tab: TabOption) => void;
  onSearchQueryChange: (query: string) => void;
}

const categoryBadgeStyles: Record<string, string> = {
  Pemerintah: "bg-blue-50 text-blue-700 border-blue-200",
  Kegiatan: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Kesehatan: "bg-rose-50 text-rose-700 border-rose-200",
  Umum: "bg-slate-50 text-slate-700 border-slate-200",
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const badgeClass = (category: string) => {
  return categoryBadgeStyles[category] ?? "bg-slate-50 text-slate-700 border-slate-200";
};

export function AnnouncementPageClient({
  announcements,
  activeTab,
  searchQuery,
  onActiveTabChange,
  onSearchQueryChange,
}: AnnouncementPageClientProps) {
  const featuredAnnouncement =
    announcements.find((announcement) => announcement.isFeatured) ??
    announcements[0];

  const urgentAnnouncement = announcements.find(
    (announcement) => announcement.isUrgent,
  );

  const sidebarAnnouncements = announcements
    .filter((a) => a.id !== featuredAnnouncement?.id)
    .slice(0, 1);

  return (
    <section className="space-y-10">
      {/* --- HEADER PROFESIONAL (CLEAN MINIMALIST) --- */}
      <div className="pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-bold tracking-widest uppercase mb-6">
          <Megaphone className="w-3.5 h-3.5" />
          Pusat Informasi Desa
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight mb-5 leading-tight">
          Kabar Dusun
        </h1>
        <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
          Dapatkan informasi terkini, agenda desa, dan rilis resmi pemerintahan secara transparan dan tepercaya. Ditulis dan disahkan secara legal oleh aparatur Karanggayam.
        </p>
      </div>

      {/* --- KONTROL FILTER & PENCARIAN (Enterprise Underline Tabs) --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-0">
        
        {/* Tabs Bergaris Bawah */}
        <div className="flex overflow-x-auto hide-scrollbar gap-8 px-1">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onActiveTabChange(tab)}
              className={`whitespace-nowrap pb-4 text-sm font-bold border-b-[3px] transition-colors duration-200 ${
                activeTab === tab
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Kotak Pencarian Minimalis */}
        <div className="relative w-full sm:w-80 pb-3 sm:pb-2">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:-translate-y-[14px]" />
          <input
            type="text"
            placeholder="Cari publikasi atau arsip..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-[3px] focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* --- GRID UTAMA: FEATURED KIRI & SIDEBAR KANAN --- */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1.1fr] items-start pt-2">
        
        {/* BERITA UTAMA */}
        <div className="flex flex-col group h-full">
          {featuredAnnouncement ? (
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative h-full">
              <div className="absolute top-4 left-4 z-20">
                 <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-slate-200/50">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Sorotan Utama
                 </span>
              </div>
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10 mix-blend-multiply opacity-60 block lg:hidden"></div>
                {featuredAnnouncement.imageUrl ? (
                  <a href={`/pengumuman/${featuredAnnouncement.id}`} className="block w-full h-full cursor-pointer">
                    <Image
                      src={featuredAnnouncement.imageUrl}
                      alt={featuredAnnouncement.title}
                      fill
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </a>
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-50 text-slate-400">
                    <span className="text-xs font-semibold tracking-wider uppercase">Tanpa Dokumentasi</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3">
                  <span className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border ${badgeClass(featuredAnnouncement.category)}`}>
                    {featuredAnnouncement.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(featuredAnnouncement.createdAt)}
                  </span>
                </div>

                <a href={`/pengumuman/${featuredAnnouncement.id}`} className="block cursor-pointer">
                  <h2 className="text-2xl sm:text-3xl font-black leading-[1.2] text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {featuredAnnouncement.title}
                  </h2>
                </a>

                <p className="text-[15px] leading-relaxed text-slate-500 line-clamp-3">
                  {featuredAnnouncement.content}
                </p>

                <div className="mt-auto pt-6">
                  <a
                    href={`/pengumuman/${featuredAnnouncement.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Selengkapnya
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-slate-500 text-center flex items-center justify-center h-full min-h-[400px]">
              Belum ada berita utama yang dipublikasikan.
            </div>
          )}
        </div>

        {/* SIDEBAR WIDGETS */}
        <aside className="space-y-6 flex flex-col h-full">
          
          {/* PENGUMUMAN MENDESAK */}
          <div className="rounded-2xl border border-rose-200/60 bg-rose-50/30 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-rose-600">
                Laporan Mendesak
              </h3>
            </div>
            
            {urgentAnnouncement ? (
              <div className="relative z-10">
                <a href={`/pengumuman/${urgentAnnouncement.id}`} className="block cursor-pointer hover:underline decoration-rose-300 underline-offset-4">
                  <h4 className="text-xl font-bold text-slate-900 leading-tight mb-3">
                    {urgentAnnouncement.title}
                  </h4>
                </a>
                <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {urgentAnnouncement.content}
                </p>
              </div>
            ) : (
              <div className="relative z-10 text-slate-500">
                <h4 className="text-[17px] font-bold text-slate-900 leading-tight mb-2">Situasi Terkendali</h4>
                <p className="text-[13px] leading-relaxed">
                  Tidak ada instruksi darurat atau maklumat desa saat ini. Suasana berjalan damai.
                </p>
              </div>
            )}
          </div>

          {/* AGENDA KEGIATAN TERDEKAT */}
          {sidebarAnnouncements.length > 0 ? (
            sidebarAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm group cursor-pointer hover:border-slate-300 hover:shadow-md transition-all flex-1"
                onClick={() => window.location.href = `/pengumuman/${announcement.id}`}
              >
                <div>
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                    <Calendar className="h-4 w-4 text-slate-500" />
                  </div>
                  <h3 className="text-[19px] font-bold text-slate-900 leading-tight mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {announcement.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 line-clamp-3">
                    {announcement.content}
                  </p>
                </div>
                <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-900 group-hover:text-emerald-600">
                  Tinjau Detail
                  <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm flex-1">
              <div>
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <Calendar className="h-4 w-4 text-slate-500" />
                </div>
                <h3 className="text-[19px] font-bold text-slate-900 leading-tight mb-2">
                  Jadwal Kosong
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  Belum ada agenda lanjutan yang diterbitkan oleh instansi desa untuk waktu dekat ini.
                </p>
              </div>
            </div>
          )}

        </aside>
      </div>
    </section>
  );
}
