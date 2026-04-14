export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  isFeatured: boolean;
  isUrgent: boolean;
  createdAt: string;
  authorId: string;
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  // Tambahin ini biar pas 'create' datanya bisa masuk ke database bre!
  category?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
}
