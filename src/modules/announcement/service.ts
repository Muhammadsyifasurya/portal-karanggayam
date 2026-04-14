import { announcementRepository } from "./repository";
import { Announcement, CreateAnnouncementPayload } from "./types";

export const announcementService = {
  getAllAnnouncements: async (options?: {
    limit?: number;
    offset?: number;
  }): Promise<Announcement[]> => {
    return await announcementRepository.findAll(options);
  },

  getAnnouncementsCount: async (): Promise<number> => {
    return await announcementRepository.count();
  },

  getAnnouncementById: async (id: string): Promise<Announcement | null> => {
    return await announcementRepository.findById(id);
  },

  createAnnouncement: async (
    payload: CreateAnnouncementPayload,
  ): Promise<Announcement> => {
    if (!payload.title || payload.title.length < 5) {
      throw new Error(
        "Judul pengumuman harus diisi dan minimal 5 karakter bre!",
      );
    }
    if (!payload.content) {
      throw new Error("Konten pengumuman nggak boleh kosong.");
    }

    return await announcementRepository.create(payload);
  },
};
