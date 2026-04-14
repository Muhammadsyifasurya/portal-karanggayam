import { PrismaClient } from "@prisma/client";
import { Announcement, CreateAnnouncementPayload } from "./types";

const prisma = new PrismaClient();

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
    }));
  },

  count: async (): Promise<number> => {
    return await prisma.announcement.count();
  },

  findById: async (id: string): Promise<Announcement | null> => {
    const data = await prisma.announcement.findUnique({
      where: { id },
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
    };
  },
};
