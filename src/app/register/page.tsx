"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/modules/auth/actions";
import { Loader2, ArrowRight, UserCircle, Key, Mail } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result && "error" in result) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh(); 
    }
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col lg:flex-row-reverse bg-slate-900 font-sans overflow-hidden selection:bg-teal-500 selection:text-white">
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0 lg:relative lg:flex-1 lg:order-last">
        <div className="absolute inset-0 bg-slate-900/60 lg:bg-slate-900/30 z-10 mix-blend-multiply transition-colors"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900 lg:bg-gradient-to-t lg:from-slate-950 lg:via-slate-900/50 z-10"></div>
        
        <img 
          src="https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80&w=1200&auto=format&fit=crop" 
          alt="Komunitas Desa" 
          className="absolute inset-0 w-full h-full object-cover zoom-pan origin-center animate-pulse-slow"
        />

        {/* --- DEKORASI DESKTOP SAJA --- */}
        <div className="hidden lg:flex absolute inset-0 z-20 flex-col justify-end p-16 xl:p-24 pb-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8 w-max">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-white shadow-sm">Layanan Reaktif 24/7</span>
          </div>

          <blockquote className="text-4xl font-semibold leading-[1.25] tracking-tight text-white drop-shadow-2xl text-balance">
            "Satu langkah pendaftaran digital awal komitmen kemudahan administratif dan perlindungan kesejahteraan bersama."
          </blockquote>
        </div>
      </div>

      {/* --- KONTEN UTAMA --- */}
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

        {/* Wadah Putih (Bottom Sheet iOS style) */}
        <div className="w-full bg-white rounded-t-[2.5rem] lg:rounded-none px-6 sm:px-12 py-10 lg:py-0 flex flex-col justify-center animate-in slide-in-from-bottom-12 duration-700 ease-out lg:animate-none lg:h-full lg:px-16 xl:px-24">
          
          <div className="w-full max-w-md mx-auto relative lg:animate-in lg:fade-in lg:slide-in-from-bottom-8 lg:duration-1000 lg:fill-mode-both">
            
            <Link href="/" className="hidden lg:inline-flex items-center gap-3 mb-10 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-teal-400 font-black shadow-lg shadow-slate-900/10 group-hover:scale-105 group-hover:-rotate-6 transition-all duration-300">
                K
              </div>
              <span className="font-extrabold text-[13px] tracking-widest text-slate-400 uppercase group-hover:text-slate-900 transition-colors">
                Portal Karanggayam
              </span>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-black tracking-tighter mb-3 text-slate-900 leading-tight">
              Pembuatan Akun
            </h1>
            <p className="text-slate-500 font-medium text-base mb-10 leading-relaxed">
              Bergabung ke dalam ekosistem digital Desa Karanggayam untuk kemudahan akses.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold flex items-center shadow-sm animate-in fade-in zoom-in duration-300">
                  {error}
                </div>
              )}
              
              <div className="space-y-5">
                <div className="group">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within:text-teal-600 transition-colors">
                    <UserCircle className="w-4 h-4" /> Nama Lengkap
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full px-5 py-4 bg-slate-50 lg:bg-white lg:border-slate-200 border-transparent rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all border"
                    placeholder="Budi Santoso"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within:text-teal-600 transition-colors">
                    <Mail className="w-4 h-4" /> Alamat Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-5 py-4 bg-slate-50 lg:bg-white lg:border-slate-200 border-transparent rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all border"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-2 group-focus-within:text-teal-600 transition-colors">
                    <Key className="w-4 h-4" /> Kata Sandi Baru
                  </label>
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-5 py-4 bg-slate-50 lg:bg-white lg:border-slate-200 border-transparent rounded-2xl text-slate-900 font-bold placeholder-slate-300 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all font-mono tracking-widest border"
                    placeholder="Minimal 6 Karakter"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-between px-6 py-4 mt-8 rounded-2xl text-sm font-bold text-white bg-teal-600 lg:bg-slate-900 lg:hover:bg-teal-600 hover:bg-teal-500 transition-all duration-300 shadow-xl shadow-teal-500/20 lg:shadow-slate-900/10 disabled:opacity-70 disabled:cursor-not-allowed group focus:outline-none focus:ring-4 focus:ring-teal-500/20"
              >
                <span className="tracking-wide">
                  {loading ? "Mendaftarkan..." : "Selesaikan Pendaftaran"}
                </span>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
                )}
              </button>
            </form>

            <div className="mt-8 lg:mt-10 text-center lg:text-left bg-slate-50 lg:bg-transparent -mx-6 sm:-mx-12 px-6 sm:px-12 py-6 lg:mx-0 lg:p-0 lg:border-t-0 border-t border-slate-100 pb-12 lg:pb-0">
              <p className="text-sm text-slate-500 font-medium">
                Sudah terdaftar?{" "}
                <Link
                  href="/login"
                  className="font-bold text-teal-600 hover:text-teal-700 hover:underline underline-offset-4 decoration-2 transition-all"
                >
                  Masuk ke akun Anda
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
