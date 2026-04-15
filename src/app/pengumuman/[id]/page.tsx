import { announcementService } from "@/modules/announcement/service";
import { Breadcrumb } from "@/components/breadcrumb";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  Eye,
  MessageCircle,
  ArrowLeft,
  Clock,
  Tag,
  ShieldAlert,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { LikeButton } from "./LikeButton";
import { ShareButton } from "./ShareButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

const formatDateShort = (value: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

/** Estimasi waktu baca berdasar jumlah kata */
const estimateReadTime = (content: string): number => {
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const categoryConfig: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  Pemerintah: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  Kegiatan: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  Kesehatan: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    border: "border-teal-200",
    dot: "bg-teal-500",
  },
  Keamanan: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  Umum: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const announcement = await announcementService.getAnnouncementById(id);
  if (!announcement) return { title: "Pengumuman Tidak Ditemukan" };
  return {
    title: `${announcement.title} — Karanggayam`,
    description: announcement.content.replace(/<[^>]*>/g, "").slice(0, 155),
  };
}

export default async function PengumumanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getSession();

  // Fetch announcement + increment views concurrently
  const [announcement] = await Promise.all([
    announcementService.getAnnouncementById(id, session?.userId),
    announcementService.incrementViews(id),
  ]);

  if (!announcement) notFound();

  // Fetch a few other announcements for "related" section
  const allAnnouncements = await announcementService.getAllAnnouncements({ limit: 6 });
  const relatedAnnouncements = allAnnouncements
    .filter((a) => a.id !== announcement.id)
    .slice(0, 3);

  const readTime = estimateReadTime(announcement.content);
  const catStyle =
    categoryConfig[announcement.category] ?? categoryConfig["Umum"];

  const breadcrumbItems = [
    { label: "Kabar Dusun", href: "/pengumuman" },
    { label: announcement.title },
  ];

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Kabar Karanggayam: *${announcement.title}*\n\nBaca selengkapnya di portal desa kita!`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[52vh] min-h-[360px] max-h-[560px] bg-slate-900 overflow-hidden">
        {announcement.imageUrl ? (
          <Image
            src={announcement.imageUrl}
            alt={announcement.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full px-4 pb-10 md:pb-14">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border backdrop-blur-sm ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
                {announcement.category}
              </span>
              {announcement.isUrgent && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-red-500 text-white animate-pulse">
                  <ShieldAlert className="w-3 h-3" />
                  Urgent
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-[44px] font-black text-white leading-tight tracking-tight mb-5 max-w-3xl">
              {announcement.title}
            </h1>

            {/* Quick meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {formatDate(announcement.createdAt.toString())}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {readTime} menit baca
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-400" />
                {announcement.views.toLocaleString("id-ID")} dibaca
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10 pb-20">

        {/* Breadcrumb card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm px-5 py-3 mb-6 flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <Link
            href="/pengumuman"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">

          {/* ── LEFT: Article body ─────────────────────────────────────── */}
          <div className="min-w-0">

            {/* Author meta card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-900">Admin Desa Karanggayam</p>
                  <p className="text-[12px] text-slate-500 font-medium">Perangkat Dusun · {formatDateShort(announcement.createdAt.toString())}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[12px] font-bold text-slate-600">{announcement.views.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[12px] font-bold text-slate-600">{announcement.category}</span>
                </div>
              </div>
            </div>

            {/* Article body */}
            <article className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 md:px-10 py-8 md:py-12 mb-8">
              <div
                className="prose prose-lg prose-slate max-w-none
                  prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-[1.85] prose-p:text-[17px]
                  prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900 prose-strong:font-black
                  prose-blockquote:border-l-4 prose-blockquote:border-emerald-400 prose-blockquote:bg-emerald-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-emerald-900
                  prose-ul:text-slate-600 prose-ol:text-slate-600
                  prose-li:marker:text-emerald-500
                  prose-img:rounded-2xl prose-img:shadow-lg"
              >
                <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
              </div>
            </article>

            {/* ── ENGAGEMENT BAR ──────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 mb-8">
              <p className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-4">Apakah informasi ini bermanfaat?</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <LikeButton
                    announcementId={announcement.id}
                    initialLikes={announcement.likes}
                    initialHasLiked={announcement.hasLiked || false}
                  />
                  <span className="text-sm text-slate-400 font-medium">
                    {announcement.likes} orang merasa bermanfaat
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={waShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold rounded-full transition-all text-sm shadow-md shadow-green-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Bagikan ke WA
                  </a>
                  <ShareButton />

                </div>
              </div>
            </div>

            {/* ── RELATED ARTICLES ────────────────────────────────────── */}
            {relatedAnnouncements.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Lainnya</p>
                    <h2 className="text-xl font-black text-slate-900">Kabar Lainnya</h2>
                  </div>
                  <Link
                    href="/pengumuman"
                    className="text-[13px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Lihat semua →
                  </Link>
                </div>

                <div className="space-y-4">
                  {relatedAnnouncements.map((item) => {
                    const style = categoryConfig[item.category] ?? categoryConfig["Umum"];
                    return (
                      <Link
                        key={item.id}
                        href={`/pengumuman/${item.id}`}
                        className="group flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all"
                      >
                        {item.imageUrl && (
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5 ${style.bg} ${style.text}`}>
                            {item.category}
                          </span>
                          <p className="text-[14px] font-bold text-slate-800 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[12px] text-slate-400 font-medium mt-1">
                            {formatDateShort(item.createdAt.toString())}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT SIDEBAR ───────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-5 sticky top-24">

            {/* Article info card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Ringkasan Artikel</p>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Tanggal Terbit</p>
                    <p className="text-[13px] font-bold text-slate-800">{formatDateShort(announcement.createdAt.toString())}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Kategori</p>
                    <p className="text-[13px] font-bold text-slate-800">{announcement.category}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Total Dibaca</p>
                    <p className="text-[13px] font-bold text-slate-800">{announcement.views.toLocaleString("id-ID")} kali</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Estimasi Baca</p>
                    <p className="text-[13px] font-bold text-slate-800">{readTime} menit</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">Diterbitkan oleh</p>
                    <p className="text-[13px] font-bold text-slate-800">Admin Desa</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Share card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Bagikan</p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold rounded-xl transition-all text-sm border border-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Bagikan ke WhatsApp
                </a>
                <ShareButton variant="sidebar" />
              </div>
            </div>

            {/* Back to list */}
            <Link
              href="/pengumuman"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Kabar
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
