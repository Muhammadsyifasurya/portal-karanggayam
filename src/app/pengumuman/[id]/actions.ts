"use server";

import { announcementService } from "@/modules/announcement/service";
import { getSession, clearSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function toggleAnnouncementLike(announcementId: string) {
  const session = await getSession();
  if (!session) {
    return { error: "Anda harus login terlebih dahulu untuk menyukai pengumuman." };
  }

  // Verifikasi user masih ada di database (bisa hilang jika DB di-reset)
  const userExists = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true },
  });

  if (!userExists) {
    // Session sudah stale — clear cookie agar user bisa login ulang
    await clearSession();
    return { error: "Sesi Anda sudah kedaluwarsa. Silakan login ulang untuk menyukai pengumuman." };
  }

  try {
    const result = await announcementService.toggleLike(announcementId, session.userId);
    revalidatePath(`/pengumuman/${announcementId}`);
    return { success: true, ...result };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[toggleAnnouncementLike] Error:", message);
    return { error: "Terjadi kesalahan saat memproses like." };
  }
}
