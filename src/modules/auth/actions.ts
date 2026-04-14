"use server";

import { hashPassword, verifyPassword, createSession, clearSession } from "@/lib/auth";
import { authRepository } from "./repository";
import type { AuthResponse } from "./types";

export async function registerUser(formData: FormData): Promise<AuthResponse> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Semua kolom wajib diisi" };
  }

  // Cek apakah pengguna sudah memiliki akun
  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    return { error: "Email sudah terdaftar" };
  }

  try {
    const hashedPassword = await hashPassword(password);

    // Create user via repository (Clean Architecture abstraction)
    const user = await authRepository.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: "USER"
    });

    // Sesikan pengguna langsung
    await createSession({
      userId: user.id,
      role: user.role,
      name: user.name,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal mendaftarkan akun" };
  }
}

export async function loginUser(formData: FormData): Promise<AuthResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" };
  }

  try {
    const user = await authRepository.findByEmail(email);

    if (!user) {
      return { error: "Kredensial tidak valid" };
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return { error: "Kredensial tidak valid" };
    }

    // Sesikan pengguna
    await createSession({
      userId: user.id,
      role: user.role,
      name: user.name,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal login. Silakan coba lagi." };
  }
}

export async function logoutUser(): Promise<AuthResponse> {
  await clearSession();
  return { success: true };
}
