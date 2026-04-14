import { prisma } from "@/lib/prisma";
import type { UserEntity, CreateUserPayload } from "./types";

export const authRepository = {
  findByEmail: async (email: string): Promise<UserEntity | null> => {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    if (!data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password, 
      role: data.role as "ADMIN" | "USER",
    };
  },

  create: async (payload: CreateUserPayload): Promise<UserEntity> => {
    const data = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.passwordHash,
        role: payload.role || "USER",
      },
    });

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      passwordHash: data.password,
      role: data.role as "ADMIN" | "USER",
    };
  },
};
