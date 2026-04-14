"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Announcement } from "@/modules/announcement/types";
import { ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import Image from "next/image";

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Health":
      return "bg-blue-100 text-blue-900";
    case "Education":
      return "bg-blue-100 text-blue-900";
    case "Environment":
      return "bg-blue-100 text-blue-900";
    default:
      return "bg-slate-100 text-slate-900";
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
  activeTab?: "All" | "Governance" | "Events" | "Health";
}

export function ContentRecommendation({
  announcements: initialAnnouncements,
  totalCount,
  activeTab = "All",
}: ContentRecommendationProps) {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    initialAnnouncements.length < totalCount,
  );
  const [itemsPerPage, setItemsPerPage] = useState(3);
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
      const categoryParam = activeTab !== "All" ? `&category=${activeTab}` : "";
      const response = await fetch(
        `/api/announcements?limit=${itemsPerPage}&offset=${announcements.length}${categoryParam}`,
      );
      if (!response.ok) throw new Error("Failed to load more announcements");

      const newAnnouncements: Announcement[] = await response.json();
      setAnnouncements((prev) => {
        const combined = [...prev, ...newAnnouncements];
        return deduplicateAnnouncements(combined);
      });
      setHasMore(newAnnouncements.length === itemsPerPage);
    } catch (error) {
      console.error("Error loading more announcements:", error);
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
    <div className="space-y-8 mt-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Announcements
          </p>
          <p className="text-sm text-slate-500">
            Stay updated with the latest news and announcements.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p className="text-xs text-slate-500">
            Showing {announcements.length} of {totalCount} announcements
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <article
            key={announcement.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              {announcement.imageUrl ? (
                <Image
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  fill
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-slate-200 text-slate-600">
                  <span className="text-sm font-semibold">No image</span>
                </div>
              )}
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-block rounded px-2 py-1 text-xs font-bold uppercase tracking-wider ${getCategoryColor(announcement.category)}`}
                >
                  {announcement.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {formatDate(announcement.createdAt)}
                </span>
              </div>

              <h3 className="text-base font-semibold text-slate-950 leading-tight line-clamp-2">
                {announcement.title}
              </h3>

              <p className="text-sm text-slate-600 line-clamp-3">
                {announcement.content}
              </p>

              <a
                href={`/pengumuman/${announcement.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Details
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Loading indicator and intersection observer trigger */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">
              Loading more announcements...
            </span>
          </div>
        )}
        {!hasMore && announcements.length > 0 && (
          <div className="text-center text-slate-500">
            <p className="text-sm">
              You&apos;ve reached the end of the announcements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
