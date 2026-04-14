"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/modules/auth/actions";
import { Loader2, ArrowRight, UserCircle, Key } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result && "error" in result) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh(); 
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col lg:flex-row bg-slate-900 font-sans overflow-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* --- BACKGROUND IMAGE (Latar Mobile & Kanan Desktop) --- */}
      <div className="absolute inset-0 z-0 lg:relative lg:flex-1 lg:order-last">
        {/* Overlay gelap untuk visibilitas teks di mobile */}
        <div className="absolute inset-0 bg-slate-900/60 lg:bg-slate-900/30 z-10 mix-blend-multiply transition-colors"></div>
        {/* Lulusan gradasi hitam presisi */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900 lg:bg-gradient-to-t lg:from-slate-950 lg:via-slate-900/50 z-10"></div>
        
        <img 
          src="https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80&w=1200&auto=format&fit=crop" 
          alt="Pemandangan Desa" 
          className="absolute inset-0 w-full h-full object-cover zoom-pan origin-center animate-pulse-slow"
        />

        {/* --- DEKORASI DESKTOP SAJA --- */}
        <div className="hidden lg:flex absolute inset-0 z-20 flex-col justify-end p-16 xl:p-24 pb-20 pointer-events-none">
          <svg className="w-10 h-10 text-emerald-400 mb-6 opacity-90" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <blockquote className="text-4xl font-semibold leading-[1.25] tracking-tight mb-8 text-white drop-shadow-2xl text-balance">
            "Kemajuan sungguh berawal dari transparansi. Bersama, kita bangun dusun yang tangguh, lestari, dan sigap memeluk era digital."
          </blockquote>
          
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
               {/* Mock avatars */}
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-200"></div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-300"></div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-400"></div>
            </div>
            <div className="ml-4 flex flex-col">
              <span className="font-bold text-white text-base drop-shadow-md">Dipercaya +1,000 Warga</span>
              <span className="text-emerald-400 font-medium text-sm tracking-wide">Desa Karanggayam</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- KONTEN UTAMA (Bottom Sheet Mobile / Kolom Kiri Desktop) --- */}
      <div className="relative z-10 flex flex-col w-full lg:w-[45%] xl:w-[40%] bg-transparent lg:bg-white h-[100dvh]">
        {/* Logo Mobile Floating di atas header */}
        <div className="lg:hidden flex items-center justify-between p-6 w-full absolute top-0 text-white z-50">
          <Link href="/" className="inline-flex items-center gap-2 group p-2 -ml-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold tracking-wide text-sm">Kembali</span>
          </Link>
        </div>

        {/* Spacer untuk Mobile mendorong Sheet ke bawah */}
        <div className="flex-1 lg:hidden"></div>

        {/* Wadah Putih (Bottom Sheet iOS style pada mobile, menempel w-full pada desktop) */}
        <div className="w-full bg-white rounded-t-[2.5rem] lg:rounded-none px-6 sm:px-12 py-10 lg:py-0 flex flex-col justify-center animate-in slide-in-from-bottom-12 duration-700 ease-out lg:animate-none lg:h-full lg:px-16 xl:px-24">
          
          <div className="w-full max-w-md mx-auto relative lg:animate-in lg:fade-in lg:slide-in-from-bottom-8 lg:duration-1000 lg:fill-mode-both">
            
            {/* Navigasi Desktop Logo */}
            <Link href="/" className="hidden lg:inline-flex items-center gap-3 mb-12 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-emerald-400 font-black shadow-lg shadow-slate-900/10 group-hover:scale-105 group-hover:-rotate-6 transition-all duration-300">
                K
              </div>
              <span className="font-ex`trabold text-[13px] tracking-widest text-slate-400 uppercase group-hover:text-slate-900 transition-colors">
                Portal Karanggayam
              </span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter mb-3 text-slate-900 leading-tight">
              Selamat Datang
            </h1>
            <p className="text-slate-500 font-medium text-base mb-10 leading-relaxed">
              Masuk untuk melanjutkan layanan administratif Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold flex items-center shadow-sm animate-in fade-in zoom-in duration-300">
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                <div className="group">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within:text-emerald-600 transition-colors">
                    <UserCircle className="w-4 h-4" /> Alamat Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-5 py-4 bg-slate-50 lg:bg-white lg:border-slate-200 border-transparent rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all border"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within:text-emerald-600 transition-colors">
                    <Key className="w-4 h-4" /> Kata Sandi
                  </label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-5 py-4 bg-slate-50 lg:bg-white lg:border-slate-200 border-transparent rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono tracking-widest border"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-between px-6 py-4 mt-8 rounded-2xl text-sm font-bold text-white bg-emerald-600 lg:bg-slate-900 lg:hover:bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-500/20 lg:shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed group focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                <span className="tracking-wide">
                  {loading ? "Memverifikasi..." : "Autentikasi Akun"}
                </span>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </form>

            <div className="mt-10 lg:mt-12 text-center lg:text-left bg-slate-50 lg:bg-transparent -mx-6 sm:-mx-12 px-6 sm:px-12 py-6 lg:mx-0 lg:p-0 lg:border-t-0 border-t border-slate-100 pb-12 lg:pb-0">
              <p className="text-sm text-slate-500 font-medium">
                Warga baru?{" "}
                <Link
                  href="/register"
                  className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4 decoration-2 transition-all"
                >
                  Buat akun Anda
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
