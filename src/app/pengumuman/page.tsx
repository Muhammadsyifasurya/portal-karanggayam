import { announcementService } from "@/modules/announcement/service";
import { AnnouncementPageWrapper } from "@/modules/announcement/components/announcement-page-wrapper";

export default async function Page() {
  const initialAnnouncements = await announcementService.getAllAnnouncements({
    limit: 12,
  });
  const totalCount = await announcementService.getAnnouncementsCount();

  return (
    <main className="bg-slate-50 text-slate-900 pt-32">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AnnouncementPageWrapper
          initialAnnouncements={initialAnnouncements}
          totalCount={totalCount}
        />
      </div>
    </main>
  );
}
