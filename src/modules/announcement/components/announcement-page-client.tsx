"use client";

import { Announcement } from "@/modules/announcement/types";
import { ChevronRight, Search, Calendar } from "lucide-react";
import Image from "next/image";

const tabOptions = ["All", "Governance", "Events", "Health"] as const;
type TabOption = (typeof tabOptions)[number];

interface AnnouncementPageClientProps {
  announcements: Announcement[];
  activeTab: TabOption;
  searchQuery: string;
  onActiveTabChange: (tab: TabOption) => void;
  onSearchQueryChange: (query: string) => void;
}

const categoryBadgeStyles: Record<string, string> = {
  Governance: "bg-blue-100 text-blue-900",
  Events: "bg-emerald-100 text-emerald-900",
  Health: "bg-teal-100 text-teal-900",
  Maintenance: "bg-orange-100 text-orange-900",
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const badgeClass = (category: string) => {
  return categoryBadgeStyles[category] ?? "bg-slate-100 text-slate-900";
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
    .filter((a) => a.category === "Events" && a.id !== featuredAnnouncement?.id)
    .slice(0, 1);

  return (
    <section className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-950">
          Village Announcements
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          Stay updated with the latest news, official notices, and community
          events directly from the Karanggayam Village Council.
        </p>
      </div>

      {/* Filter Tabs dan Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabOptions.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onActiveTabChange(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab === "All" ? "All Notices" : tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Grid - Featured Left, Sidebar Right */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_380px] lg:auto-rows-fr">
        {/* Featured Article */}
        <div className="flex flex-col">
          {featuredAnnouncement ? (
            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col">
              <div className="relative aspect-video bg-slate-100">
                {featuredAnnouncement.imageUrl ? (
                  <Image
                    src={featuredAnnouncement.imageUrl}
                    alt={featuredAnnouncement.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-300 text-slate-600">
                    <span className="text-sm font-semibold">No image</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-block rounded px-3 py-1 text-xs font-bold uppercase tracking-wider ${badgeClass(featuredAnnouncement.category)}`}
                  >
                    {featuredAnnouncement.category}
                  </span>
                  <span className="text-sm text-slate-500">
                    {formatDate(featuredAnnouncement.createdAt)}
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-tight text-slate-950">
                  {featuredAnnouncement.title}
                </h2>

                <p className="text-sm leading-6 text-slate-600">
                  {featuredAnnouncement.content}
                </p>

                <a
                  href={`/pengumuman/${featuredAnnouncement.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Read Full Announcement
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-600">
              No featured announcement available.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 h-full">
          {/* Featured Sidebar Cards */}
          {sidebarAnnouncements.length > 0 ? (
            sidebarAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-xl border-0 bg-emerald-400 p-6 min-h-64 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white bg-opacity-30">
                    <Calendar className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {announcement.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white text-opacity-95">
                    {announcement.content}
                  </p>
                </div>
                <a
                  href={`/pengumuman/${announcement.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            ))
          ) : (
            <div className="rounded-xl border-0 bg-emerald-400 p-6 min-h-64 flex flex-col justify-between shadow-sm">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white bg-opacity-30">
                  <Calendar className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  No Featured Events
                </h3>
                <p className="mt-3 text-sm leading-6 text-white text-opacity-95">
                  Check back soon for upcoming events and announcements from the
                  village community.
                </p>
              </div>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80"
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Urgent Notice */}
          <div className="rounded-xl border-0 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-600">
                Urgent Notice
              </h3>
            </div>
            {urgentAnnouncement ? (
              <>
                <h4 className="text-lg font-bold text-slate-950">
                  {urgentAnnouncement.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {urgentAnnouncement.content}
                </p>
              </>
            ) : (
              <>
                <h4 className="text-lg font-bold text-slate-950">
                  No Urgent Notices
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Currently there are no urgent notices. Stay informed and check
                  back regularly.
                </p>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
