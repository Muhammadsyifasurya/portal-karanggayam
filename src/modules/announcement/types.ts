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
  likes: number;
  views: number;
  hasLiked?: boolean;
}

export interface CreateAnnouncementPayload {
  title: string;
  content: string;
  category?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  isUrgent?: boolean;
  likes?: number;
  views?: number;
}
