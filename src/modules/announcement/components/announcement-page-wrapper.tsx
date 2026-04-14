"use client";

import { useState, useMemo } from "react";
import { Announcement } from "@/modules/announcement/types";
import { AnnouncementPageClient } from "./announcement-page-client";
import { ContentRecommendation } from "./content-recomendation";

const tabOptions = ["All", "Governance", "Events", "Health"] as const;
type TabOption = (typeof tabOptions)[number];

interface AnnouncementPageWrapperProps {
  initialAnnouncements: Announcement[];
  totalCount: number;
}

export function AnnouncementPageWrapper({
  initialAnnouncements,
  totalCount,
}: AnnouncementPageWrapperProps) {
  const [activeTab, setActiveTab] = useState<TabOption>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAnnouncements = useMemo(() => {
    let filtered = initialAnnouncements;

    if (activeTab !== "All") {
      filtered = filtered.filter(
        (announcement) => announcement.category === activeTab,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(query) ||
          announcement.content.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [activeTab, initialAnnouncements, searchQuery]);

  return (
    <>
      <AnnouncementPageClient
        announcements={filteredAnnouncements}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onActiveTabChange={setActiveTab}
        onSearchQueryChange={setSearchQuery}
      />
      <ContentRecommendation
        announcements={filteredAnnouncements}
        totalCount={totalCount}
        activeTab={activeTab}
      />
    </>
  );
}
