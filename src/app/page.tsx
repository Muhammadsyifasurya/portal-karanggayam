import Link from "next/link";
import { announcementRepository } from "@/modules/announcement/repository";
import {
  Search,
  Megaphone,
  MessageSquare,
  Calendar,
  FileText,
  ShieldCheck,
  Users,
  MapPin,
  Activity,
  ArrowRight,
  Landmark,
  Leaf,
  Store,
  ChevronRight,
  Newspaper
} from "lucide-react";

const services = [
  {
    title: "Surat Pengantar",
    description: "Layanan pembuatan surat pengantar secara online.",
    icon: FileText,
    href: "/layanan/surat",
    color: "bg-blue-50 text-blue-600",
    hoverBorder: "hover:border-blue-200",
    hoverBg: "hover:bg-blue-600 hover:text-white"
  },
  {
    title: "Lapor Desa!",
    description: "Sampaikan aspirasi atau aduan secara anonim.",
    icon: MessageSquare,
    href: "/lapor",
    color: "bg-rose-50 text-rose-600",
    hoverBorder: "hover:border-rose-200",
    hoverBg: "hover:bg-rose-600 hover:text-white"
  },
  {
    title: "Info Bansos",
    description: "Cek jadwal dan penerima bantuan sosial.",
    icon: ShieldCheck,
    href: "/info/bansos",
    color: "bg-emerald-50 text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
    hoverBg: "hover:bg-emerald-600 hover:text-white"
  },
  {
    title: "Kesehatan",
    description: "Jadwal posyandu dan info kesehatan warga.",
    icon: Activity,
    href: "/info/kesehatan",
    color: "bg-purple-50 text-purple-600",
    hoverBorder: "hover:border-purple-200",
    hoverBg: "hover:bg-purple-600 hover:text-white"
  },
];


const stats = [
  { label: "Total Penduduk", value: "1,250", icon: Users },
  { label: "Jumlah RT", value: "8", icon: MapPin },
  { label: "Kepala Keluarga", value: "342", icon: Landmark },
  { label: "Luas Wilayah", value: "45 Ha", icon: Leaf },
];

export default async function Home() {
  const dbAnnouncements = await announcementRepository.findAll({ limit: 3 });

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/background1.png" 
            alt="Pemandangan Sawah Pedesaan" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-balance flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-white">Portal Resmi Terintegrasi</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            Dusun <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Karanggayam</span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-light drop-shadow">
            Transparan, inovatif, dan berdikari. Menghadirkan layanan birokrasi yang lebih dekat dan mudah, dari mana saja dan kapan saja.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto sm:max-w-none">
            <Link
              href="/layanan"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 hover:bg-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-500"
            >
              Urus Administrasi
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pengumuman"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold border border-white/20 shadow-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Lihat Pengumuman
              <Search className="w-5 h-5 opacity-70" />
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK SERVICES SECTION */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Layanan Digital Warga</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Akses cepat untuk keperluan utama Anda di Dusun Karanggayam tanpa perlu antre di balai desa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, idx) => (
              <Link key={idx} href={svc.href} className={`group block p-8 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${svc.hoverBorder}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 mb-6 ${svc.color} ${svc.hoverBg}`}>
                  <svc.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800">{svc.title}</h3>
                <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">{svc.description}</p>
                <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                  Akses Layanan <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION - MODERN BENTO */}
      <section className="pt-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
               <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] opacity-20"></div>
               <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1594834749740-74b3d7ba5cb6?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-50">Data Terbuka</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Karanggayam <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Dalam Angka</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md font-light">
                  Transparansi adalah kunci komitmen kami. Kami menyajikan data kependudukan dan kewilayahan secara terbuka selayaknya *dashboard* modern untuk mendukung pembangunan desa cerdas.
                </p>
                <Link href="/statistik" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-bold group transition-colors">
                  Lihat Seluruh Rincian Data 
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Bento Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Large Stat Card */}
                <div className="col-span-2 sm:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors group">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <p className="text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter">1,250</p>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total Penduduk</p>
                </div>
                
                {/* Medium Stat Cards Stacked */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-4 md:gap-6">
                  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-colors flex items-center justify-between group">
                    <div>
                      <p className="text-4xl font-black text-white mb-1">8</p>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Jumlah RT</p>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-[2rem] border border-emerald-500/50 shadow-[rgba(16,185,129,0.2)_0px_10px_40px_-10px] hover:shadow-[rgba(16,185,129,0.4)_0px_10px_40px_-10px] transition-all flex items-center justify-between group">
                    <div>
                      <p className="text-4xl font-black text-white mb-1 tracking-tight">342</p>
                      <p className="text-xs font-semibold text-emerald-100 uppercase tracking-widest">Kepala Keluarga</p>
                    </div>
                    <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                      <Landmark className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Wide Bottom Card */}
                <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-colors flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-500">
                    <Leaf className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter">45</p>
                      <span className="text-emerald-400 font-bold overflow-hidden text-lg">Hektar</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Luas Wilayah Pengelolaan Total</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* NEWS & LATEST SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                <Newspaper className="w-4 h-4" /> Informasi Terbaru
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Kabar Karanggayam</h2>
            </div>
            <Link href="/pengumuman" className="shrink-0 flex items-center font-semibold text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4">
              Lihat Semua Kabar <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dbAnnouncements.length > 0 ? dbAnnouncements.map((item) => (
              <article key={item.id} className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:border-slate-200">
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                  <img src={item.imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10" loading="lazy" />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-900 shadow-sm border border-white/50">
                      {item.category}
                    </span>
                    {item.isUrgent && (
                      <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-sm">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-200">
                    <Link href={`/pengumuman/${item.id}`} className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </article>
            )) : (
              <div className="col-span-1 md:col-span-3 text-center py-12 text-slate-500">
                Belum ada kabar atau pengumuman terbaru saat ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* POTENTIAL/BUSINESS SECTION */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627384113743-6ac5f5f5c09e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10 px-8 py-16 md:p-16 lg:p-20 grid md:grid-cols-2 items-center gap-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-semibold mb-6">
                  <Store className="w-4 h-4" /> Potensi Lokal
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Dukung BUMDes <br /> <span className="text-emerald-400">Dan UMKM Kami</span>
                </h2>
                <p className="text-lg text-emerald-50 mb-8 leading-relaxed max-w-lg">
                  Kenali beragam produk unggulan karya asli warga Karanggayam. Dari hasil pertanian organik hingga kerajinan tangan berkualitas tinggi.
                </p>
                <Link href="/umkm" className="inline-flex px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/30 transition-all duration-300">
                  Jelajahi Etalase Desa
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=600&auto=format&fit=crop" alt="Pertanian" className="rounded-3xl shadow-lg border-4 border-white/10" />
                  <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&auto=format&fit=crop" alt="Hasil Bumi" className="rounded-3xl shadow-lg border-4 border-white/10" />
                </div>
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop" alt="Kerajinan" className="rounded-3xl shadow-lg border-4 border-white/10" />
                  <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop" alt="Kuliner" className="rounded-3xl shadow-lg border-4 border-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
