"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function ConditionalNavbar({ session }: { session: any }) {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;
  return <Navbar session={session} />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;
  return <Footer />;
}
