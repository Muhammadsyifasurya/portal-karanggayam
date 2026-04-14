"use client";

import Link from "next/link";
import { Menu, X, ChevronRight, UserCircle2, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { logoutUser } from "@/modules/auth/actions";
import type { SessionPayload } from "@/lib/auth";

export function Navbar({ session }: { session: SessionPayload | null }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const isLoggedIn = !!session;
  const user = session || { name: "" };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clik di luar dropdown profile untuk menutupnya
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setProfileOpen(false);
    router.refresh(); // Refresh layout to fetch empty session
    router.push("/");
  };

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Profil Dusun", href: "/about" },
    { label: "Kabar Desa", href: "/pengumuman" },
    { label: "Layanan Warga", href: "/layanan" },
    { label: "Potensi Desa", href: "/potensi" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out flex justify-center ${
        isScrolled ? "pt-4" : "pt-6"
      }`}
    >
      <div 
        className={`w-full max-w-6xl mx-4 sm:mx-6 lg:mx-8 transition-all duration-700 rounded-full border ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border-white/60 py-3 px-4 sm:px-6" 
            : "bg-white/40 backdrop-blur-md shadow-sm border-white/20 py-4 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              K
            </div>
            <span className={`font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-800' : 'text-slate-900'} hidden sm:block`}>
              Karanggayam
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? "text-emerald-700 bg-emerald-50/80 shadow-sm border border-emerald-100"
                      : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100/50 border border-transparent"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA (Profil Auth) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                >
                  <UserCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-[0_10px_40px_rgb(0,0,0,0.08)] rounded-[1.5rem] p-2 transition-all duration-300 origin-top-right ${profileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="px-4 py-3 border-b border-slate-100 mb-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profil Saya
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar (Logout)
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors px-6 py-2.5 rounded-full shadow-md hover:shadow-emerald-500/20"
              >
                <UserCircle2 className="w-5 h-5 opacity-90" />
                <span>Masuk / Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative rounded-full p-2.5 bg-white/50 border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-sm"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (floating card) */}
      <div
        className={`absolute top-[110%] left-4 right-4 max-w-xl mx-auto md:hidden transition-all duration-500 origin-top overflow-hidden rounded-[2rem] bg-white/95 backdrop-blur-3xl border border-white/80 shadow-2xl ${
          mobileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="p-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-emerald-50/80 text-emerald-700 border border-emerald-100 shadow-sm" 
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600 border border-transparent"
                }`}
              >
                {link.label}
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-emerald-500' : 'text-slate-300'}`} />
              </Link>
            );
          })}
          
          <div className="h-px w-full bg-slate-100 my-2"></div>
          
          {isLoggedIn ? (
            <>
              <div className="px-5 py-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Masuk sebagai</p>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
              </div>
              <Link 
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
              >
                <User className="w-5 h-5 text-emerald-500" />
                Profil Saya
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                Keluar (Logout)
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-sm font-bold bg-slate-900 text-white hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <UserCircle2 className="w-5 h-5 opacity-80" />
              Masuk / Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
