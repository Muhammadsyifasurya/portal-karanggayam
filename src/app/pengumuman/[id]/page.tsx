import { announcementService } from "@/modules/announcement/service";
import { Breadcrumb } from "@/components/breadcrumb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

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

export default async function PengumumanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const announcement = await announcementService.getAnnouncementById(id);

  if (!announcement) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Pengumuman", href: "/pengumuman" },
    { label: announcement.title },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <article className="bg-white rounded-lg shadow-sm p-8">
          {announcement.imageUrl && (
            <div className="mb-6">
              <Image
                src={announcement.imageUrl}
                alt={announcement.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                announcement.category === "Governance"
                  ? "bg-blue-100 text-blue-900"
                  : announcement.category === "Events"
                    ? "bg-emerald-100 text-emerald-900"
                    : announcement.category === "Health"
                      ? "bg-teal-100 text-teal-900"
                      : "bg-slate-100 text-slate-900"
              }`}
            >
              {announcement.category}
            </span>
            {announcement.isUrgent && (
              <span className="inline-block ml-2 px-3 py-1 text-sm font-medium bg-red-100 text-red-900 rounded-full">
                Urgent
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {announcement.title}
          </h1>

          <div className="flex items-center text-gray-600 mb-6 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {formatDate(announcement.createdAt)}
              </span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span className="text-sm">Admin Karanggayam</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
          </div>
        </article>
      </div>
    </div>
  );
}
