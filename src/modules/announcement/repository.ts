import { prisma } from "@/lib/prisma";
import { Announcement, CreateAnnouncementPayload } from "./types";

export const announcementRepository = {
  findAll: async (options?: {
    limit?: number;
    offset?: number;
  }): Promise<Announcement[]> => {
    const data = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      take: options?.limit,
      skip: options?.offset,
    });

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      category: item.category,
      imageUrl: item.imageUrl,
      isFeatured: item.isFeatured,
      isUrgent: item.isUrgent,
      authorId: item.authorId,
      createdAt: item.createdAt.toISOString(),
      views: item.views,
      likes: item.likes,
    }));
  },

  count: async (): Promise<number> => {
    return await prisma.announcement.count();
  },

  findById: async (id: string, userId?: string): Promise<Announcement | null> => {
    const data = await prisma.announcement.findUnique({
      where: { id },
      include: {
        likedBy: userId ? { where: { userId } } : false,
      }
    });

    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      category: data.category,
      imageUrl: data.imageUrl,
      isFeatured: data.isFeatured,
      isUrgent: data.isUrgent,
      authorId: data.authorId,
      createdAt: data.createdAt.toISOString(),
      views: data.views,
      likes: data.likes,
      hasLiked: userId && data.likedBy ? data.likedBy.length > 0 : false,
    };
  },

  create: async (payload: CreateAnnouncementPayload) => {
    let admin = await prisma.user.findFirst({
      where: { email: "admin@karanggayam.com" },
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: { name: "Admin Karanggayam", email: "admin@karanggayam.com" },
      });
    }

    const result = await prisma.announcement.create({
      data: {
        title: payload.title,
        content: payload.content,
        category: payload.category || "Umum",
        imageUrl: payload.imageUrl,
        isFeatured: payload.isFeatured || false,
        isUrgent: payload.isUrgent || false,
        authorId: admin.id,
      },
    });

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      category: result.category,
      imageUrl: result.imageUrl,
      isFeatured: result.isFeatured,
      isUrgent: result.isUrgent,
      authorId: result.authorId,
      createdAt: result.createdAt.toISOString(),
      views: result.views,
      likes: result.likes,
    };
  },

  incrementViews: async (id: string) => {
    await prisma.announcement.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  },

  toggleLike: async (announcementId: string, userId: string): Promise<{ liked: boolean; totalLikes: number }> => {
    const existingLike = await prisma.announcementLike.findUnique({
      where: {
        userId_announcementId: { userId, announcementId },
      },
    });

    if (existingLike) {
      await prisma.$transaction([
        prisma.announcementLike.delete({ where: { userId_announcementId: { userId, announcementId } } }),
        prisma.announcement.update({ where: { id: announcementId }, data: { likes: { decrement: 1 } } })
      ]);
    } else {
      await prisma.$transaction([
        prisma.announcementLike.create({ data: { userId, announcementId } }),
        prisma.announcement.update({ where: { id: announcementId }, data: { likes: { increment: 1 } } })
      ]);
    }

    const updated = await prisma.announcement.findUnique({
      where: { id: announcementId },
      select: { likes: true }
    });

    return {
      liked: !existingLike,
      totalLikes: updated?.likes || 0
    };
  },
};
