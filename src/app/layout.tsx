import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConditionalNavbar, ConditionalFooter } from "@/components/conditional-layout";
import { ToastProvider } from "@/components/toast";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karanggayam Village Portal",
  description: "Portal berita dan pengumuman resmi Dusun Karanggayam",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { getSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <ConditionalNavbar session={session} />
          <main className="flex-1">{children}</main>
          <ConditionalFooter />
        </ToastProvider>
      </body>
    </html>
  );
}
