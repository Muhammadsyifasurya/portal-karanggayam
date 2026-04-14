"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Announcements", href: "/pengumuman" },
    { label: "Profile", href: "/profile" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20"
          : "bg-white/10 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="group flex items-center gap-3 text-2xl font-bold text-emerald-700 hover:text-emerald-800 transition-all duration-300 hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
              K
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
              Karanggayam
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "text-emerald-700"
                      : "text-slate-700 hover:text-emerald-700"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/admin/pengumuman"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-emerald-700 hover:to-emerald-800"
            >
              <span>Login</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative rounded-xl p-3 text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-all duration-300 hover:scale-110 touch-manipulation focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            aria-label="Toggle mobile menu"
          >
            <div className="relative h-6 w-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-180 opacity-0 scale-75"
                    : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-180 opacity-0 scale-75"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-200/50 py-6">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-5 fade-in ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 shadow-sm"
                        : "text-slate-700 hover:text-emerald-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-xl" />
                    )}
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <Link
                  href="/admin/pengumuman"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:from-emerald-700 hover:to-emerald-800 animate-in slide-in-from-left-5 fade-in"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    animationDelay: `${navLinks.length * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <span>Login</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-white/70 transition-all duration-300 group-hover:bg-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
