"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Ambient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand/Hero Footer */}
          <div className="lg:col-span-5 flex flex-col items-start pr-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-black text-white mb-6 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-emerald-500/20">
                K
              </div>
              <span className="tracking-tight">Karanggayam</span>
            </Link>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-md font-light">
              Membangun kemandirian dusun dengan menyelaraskan keterbukaan teknologi, inovasi berkelanjutan, tanpa pernah menanggalkan akar tradisi warga.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all duration-300 group">
                <FaFacebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all duration-300 group">
                <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" aria-label="WhatsApp" className="w-12 h-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all duration-300 group">
                <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 pl-0 lg:pl-10">
            <div className="space-y-6">
              <h3 className="text-white font-bold tracking-wider uppercase text-sm">Peta Situs</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Beranda', href: '/' },
                  { name: 'Profil Dusun', href: '/about' },
                  { name: 'Kabar & Berita', href: '/pengumuman' },
                  { name: 'Layanan', href: '/layanan' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center group font-medium text-sm">
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold tracking-wider uppercase text-sm">Layanan Digital</h3>
              <ul className="space-y-4">
                {[
                  'Urus Administrasi',
                  'Lapor Desa',
                  'Cek Bantuan',
                  'Aspirasi Warga'
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center group font-medium text-sm">
                      {item}
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h3 className="text-white font-bold tracking-wider uppercase text-sm">Pusat Bantuan</h3>
              <ul className="space-y-5">
                <li>
                  <a href="https://maps.app.goo.gl/WXbNAEoMYgvg3xC17" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-start gap-3 group text-sm font-medium">
                    <MapPin className="w-5 h-5 shrink-0 transition-transform text-emerald-600" />
                    <span className="leading-relaxed">Gedongan, Panjangrejo, Pundong, Bantul, DIY</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@karanggayam.desa.id" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-3 group text-sm font-medium">
                    <Mail className="w-5 h-5 shrink-0 transition-transform text-emerald-600" />
                    <span>halo@karanggayam.id</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+6281234567890" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-3 group text-sm font-medium">
                    <Phone className="w-5 h-5 shrink-0 transition-transform text-emerald-600" />
                    <span>+62 812-3456-7890</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium text-center md:text-left">
            &copy; {currentYear} Dusun Karanggayam. Dirancang untuk transparansi dan kemudahan akses.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-slate-500 hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
