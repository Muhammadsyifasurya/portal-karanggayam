import Link from "next/link";
import {
  BookOpen,
  Target,
  Compass,
  Users,
  MapPin,
  Award,
  ChevronRight,
  ArrowRight,
  PieChart,
  Home,
  Activity,
  Briefcase,
  TrendingUp
} from "lucide-react";

const team = [
  {
    name: "Budi Santoso, S.E.",
    role: "Kepala Dusun",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ahmad Wijaya",
    role: "Sekretaris Dusun",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Siti Rahmawati",
    role: "Kaur Keuangan",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Joko Anwar",
    role: "Kaur Perencanaan",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
];

const missions = [
  "Meningkatkan kualitas pelayanan publik secara cepat dan transparan.",
  "Mendorong partisipasi warga dalam pembangunan infrastruktur dan fasilitas umum.",
  "Mengoptimalkan potensi pertanian dan UMKM menjadi kekuatan ekonomi desa.",
  "Menjaga kerukunan, kelestarian budaya, serta ketenteraman lingkungan.",
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 overflow-x-hidden">
      {/* HERO SECTION - MODERN EDITORIAL STYLE */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Typography */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-800">Kenali Kami Lebih Dekat</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 leading-[1.05] mb-8">
                Jantung <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Karanggayam</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed font-light max-w-lg mb-10">
                Pusat pergerakan, budaya, dan inovasi yang tak lekang oleh waktu. Temukan esensi dan ruh sesungguhnya dari masyarakat dusun kami di sini.
              </p>
              
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">
                <span>Tradisi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                <span>Inovasi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                <span>Integritas</span>
              </div>
            </div>

            {/* Right: Asymmetric Image Collage (Hidden on small screens for better UX) */}
            <div className="lg:col-span-6 relative h-[500px] w-full hidden lg:block">
              {/* Graphic Element: Light Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-300/40 to-teal-100/20 blur-3xl z-0"></div>
              
              {/* Image 1: Tall Oval / Pill */}
              <div className="absolute top-0 right-4 w-[240px] h-[380px] rounded-full overflow-hidden shadow-2xl border-8 border-white z-20 hover:-translate-y-4 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Sawah Karanggayam" />
              </div>
              
              {/* Image 2: Wide Box */}
              <div className="absolute bottom-4 left-0 w-[340px] h-[220px] rounded-[2rem] overflow-hidden shadow-xl border-8 border-slate-50 z-30 hover:-translate-y-4 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Kerja Bakti" />
              </div>
              
              {/* Image 3: Small floating abstract square */}
              <div className="absolute top-12 left-12 w-[180px] h-[180px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white z-40 transform -rotate-6 hover:rotate-0 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Tradisi" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEJARAH & TENTANG KAMI */}
      <section className="py-24 relative bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-8 items-end mb-16">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4">
                <BookOpen className="w-5 h-5" /> Profil Dusun
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Menjaga <span className="text-emerald-600">Akar Tradisi,</span><br/>Menyemai Inovasi.
              </h2>
            </div>
            <div className="md:w-1/3">
              <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-emerald-500 pl-5">
                Desa kami bukan sekadar hamparan sawah di peta, melainkan ruang temu bagi warisan luhur gotong royong yang terus mekar seiring waktu.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Kolom Kiri: Galeri Dinamis (Mosaik) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="col-span-2 h-64 sm:h-72 rounded-[2rem] overflow-hidden group relative shadow-lg">
                <img src="https://images.unsplash.com/photo-1546845776-dcdf70fd09e3?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Tradisi & Persawahan" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="h-48 sm:h-56 rounded-[2rem] overflow-hidden group shadow-lg">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Warga Karanggayam" />
              </div>
              <div className="bg-emerald-600 h-48 sm:h-56 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Award className="w-24 h-24" />
                </div>
                <div className="relative z-10 hidden sm:block">
                  <Award className="w-8 h-8 opacity-80" />
                </div>
                <div className="relative z-10 mt-auto">
                  <p className="text-4xl sm:text-5xl font-extrabold mb-1 tracking-tighter">1928</p>
                  <p className="text-xs sm:text-sm text-emerald-100 font-bold tracking-widest uppercase">Terbentuk Secara Administratif</p>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Narasi & Poin Esensial */}
            <div className="lg:col-span-7 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 flex flex-col justify-center">
              <div className="prose prose-lg prose-slate max-w-none">
                <p className="font-semibold text-slate-800 text-xl md:text-2xl mb-6 leading-snug">
                  Dusun Karanggayam merupakan pemukiman subur yang nama sejarahnya dipetik dari pohon Gayam — pohon rindang yang dahulu tegak memayungi sebagian besar pekarangan warga.
                </p>
                <p className="text-slate-600 mb-10 leading-relaxed">
                  Karanggayam kini berdiri bukan hanya sebagai catatan sejarah yang statis. Pedukuhan ini telah bertransformasi menjadi desa percontohan yang sigap mengadaptasi digitalisasi secara tangkas. Sekalipun birokrasi mengadopsi standar modern, keramahtamahan serta pekatnya rasa persaudaraan dan toleransi di sini tetap tebal, tumbuh sebagai fondasi kokoh Dusun.
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-200/60">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Pilar Identitas Warga</h4>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-slate-100 shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm leading-tight text-balance">Gotong Royong & Peduli</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-slate-100 shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm leading-tight text-balance">Mandiri & Inovatif</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-slate-100 shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm leading-tight text-balance">Transparansi Terintegrasi</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI SECTION */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            
            <div className="md:col-span-5 relative">
              <div className="bg-emerald-600 p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <Target className="w-32 h-32 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6 relative z-10">Visi Kami</h2>
                <p className="text-emerald-50 text-xl leading-relaxed italic relative z-10">
                  "Terwujudnya Dusun Karanggayam yang Sejahtera, Religius, Inovatif, Mandiri, dan Berbudaya Berlandaskan Semangat Gotong Royong."
                </p>
              </div>
            </div>

            <div className="md:col-span-7 md:pl-8">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-6">
                <Target className="w-5 h-5" /> Misi Kami
              </div>
              <h3 className="text-3xl font-bold mb-8">Langkah Strategis Mewujudkan Visi</h3>
              
              <div className="space-y-6">
                {missions.map((mission, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-xl font-black text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                        {mission}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SENSUS & DEMOGRAFI SECTION */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-linear-to-bl from-emerald-50/80 to-transparent blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[400px] h-[400px] rounded-full bg-linear-to-tr from-slate-100 to-transparent blur-3xl z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-100 shadow-sm">
                <PieChart className="w-4 h-4" /> Demografi Warga
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Potret <span className="text-emerald-600">Sensus &amp; Demografi</span><br/>Karanggayam.
              </h2>
            </div>
            <div className="md:w-1/3">
              <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-emerald-500 pl-5">
                Data terpadu sebaran penduduk yang menjadi fondasi pengambilan kebijakan dan pembangunan berkelanjutan dusun.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Key Metrics */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Total Card */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20 group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Users className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <p className="text-slate-400 font-medium tracking-wide mb-2 uppercase text-xs">Total Penduduk</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black tracking-tighter">1,245</p>
                    <span className="text-emerald-400 font-bold">Jiwa</span>
                  </div>
                </div>
              </div>

              {/* KK Card */}
              <div className="bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-600/20 group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Home className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 border border-white/10">
                    <Home className="w-6 h-6" />
                  </div>
                  <p className="text-emerald-100 font-medium tracking-wide mb-2 uppercase text-xs">Kepala Keluarga (KK)</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black tracking-tighter">382</p>
                    <span className="text-emerald-200 font-bold">Keluarga</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Stats */}
            <div className="lg:col-span-8 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-12">
                
                {/* Gender Split */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
                    <Users className="w-4 h-4 text-emerald-600" /> Rasio Gender
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-slate-700">Laki-laki</span>
                        <span className="text-slate-900 font-bold">610 Jiwa (49%)</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-800 rounded-full w-[49%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2 font-medium">
                        <span className="text-slate-700">Perempuan</span>
                        <span className="text-slate-900 font-bold">635 Jiwa (51%)</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[51%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Age Demographics */}
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Kelompok Usia
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 rounded-full bg-emerald-400"></div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase">Usia Produktif</p>
                          <p className="font-bold text-slate-800 text-sm">15 - 64 Tahun</p>
                        </div>
                      </div>
                      <p className="font-black text-slate-900">68%</p>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 rounded-full bg-emerald-200"></div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase">Usia Muda</p>
                          <p className="font-bold text-slate-800 text-sm">0 - 14 Tahun</p>
                        </div>
                      </div>
                      <p className="font-black text-slate-900">21%</p>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 rounded-full bg-slate-300"></div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase">Usia Lanjut</p>
                          <p className="font-bold text-slate-800 text-sm">&gt; 65 Tahun</p>
                        </div>
                      </div>
                      <p className="font-black text-slate-900">11%</p>
                    </div>
                  </div>
                </div>

                {/* Occupations */}
                <div className="md:col-span-2 pt-8 border-t border-slate-200/60 mt-2">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
                    <Briefcase className="w-4 h-4 text-emerald-600" /> Mata Pencaharian Utama
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">45<span className="text-lg text-emerald-500">%</span></p>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-balance">Petani / Buruh Tani</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">25<span className="text-lg text-emerald-500">%</span></p>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-balance">Wiraswasta / UMKM</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">15<span className="text-lg text-emerald-500">%</span></p>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-balance">Karyawan Swasta</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter">15<span className="text-lg text-emerald-500">%</span></p>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-balance">PNS / Lainnya</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
              <Users className="w-4 h-4" /> Aparatur & Pengurus
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Struktur Pemerintahan Dusun
            </h2>
            <p className="text-slate-600 text-lg">
              Mengenal lebih dekat para aparatur yang bertugas dan melayani masyarakat di Dusun Karanggayam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((person, idx) => (
              <div key={idx} className="group relative">
                <div className="aspect-[3/4] bg-slate-100 rounded-[2rem] overflow-hidden relative mb-5 shadow-sm border border-slate-100 group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center px-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                  <p className="text-emerald-600 font-medium">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/layanan" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              Lihat Seluruh Struktur Organisasi <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* PETA WILAYAH SECTION */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 -translate-y-12 -translate-x-1/3 w-[600px] h-[600px] rounded-full bg-linear-to-br from-emerald-100/50 to-emerald-50/10 blur-3xl opacity-50 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-emerald-700 text-xs font-semibold mb-4">
              <MapPin className="w-4 h-4" /> Geografi & Peta
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Letak & Wilayah Dusun
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Berada di titik tengah yang strategis, diberkahi potensi alam melimpah serta menjembatani roda ekonomi pedesaan dan akses lintas daerah.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Info Cards - 5 cols */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                  <Compass className="w-40 h-40 text-emerald-600 -translate-y-10 translate-x-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Kondisi Geografis</h3>
                <p className="text-slate-600 leading-relaxed relative z-10 mb-8">
                  Secara geografis diapit oleh persawahan subur dan lintasan sungai irigasi alami. Struktur tanah yang kokoh di area dataran menengah memberikan keuntungan yang luar biasa untuk sektor agraris warga Karanggayam.
                </p>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      Batas Utara
                    </p>
                    <p className="text-slate-900 font-bold">Dusun Tarungan</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      Batas Selatan
                    </p>
                    <p className="text-slate-900 font-bold">Dusun Sarang</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      Batas Barat
                    </p>
                    <p className="text-slate-900 font-bold">Jalan Parangtritis</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:shadow-md transition-all">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                      Batas Timur
                    </p>
                    <p className="text-slate-900 font-bold">Dusun Watu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map iframe - 7 cols */}
            <div className="lg:col-span-7 relative h-[450px] lg:h-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/60 border-4 border-white group bg-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15805.30326223016!2d110.3178034!3d-7.9652413!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7b000239a8b071%3A0xe6e06d431b02e561!2sGedongan%2C%20Panjangrejo%2C%20Pundong%2C%20Bantul%20Regency%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1776178709087!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0 grayscale-[15%] contrast-[1.05] group-hover:grayscale-0 transition-all duration-1000"
              ></iframe>
              
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-[2rem] pointer-events-none z-10"></div>
              
              {/* Floating Modern Action Button */}
              <div className="absolute bottom-6 inset-x-0 flex justify-center z-20 pointer-events-none">
                <a 
                  href="https://maps.app.goo.gl/WXbNAEoMYgvg3xC17" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-900/95 hover:bg-emerald-600 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl font-bold text-white transition-all duration-300 flex items-center gap-3 border border-white/10 hover:scale-105 hover:shadow-emerald-500/40 pointer-events-auto group/btn"
                >
                  <MapPin className="w-5 h-5 text-emerald-400 group-hover/btn:text-white transition-colors" />
                  Buka Titik Navigasi
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
