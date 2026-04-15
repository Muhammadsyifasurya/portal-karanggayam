import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data Karanggayam...');

  // 1. Bersihkan data lama
  await prisma.ticket.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.user.deleteMany();

  // 2. Buat Data User (Admin & Warga Biasa)
  const admin = await prisma.user.create({
    data: {
      name: 'Pak Kadus (Admin)',
      email: 'admin@karanggayam.com',
      password: 'password123', 
      role: 'ADMIN',
    },
  });

  const warga = await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi@warga.com',
      password: 'password123',
      role: 'USER',
    },
  });

  // 3. Buat Data Pengumuman (Kabar Desa) - TOTAL 11 DATA
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Kerja Bakti Membersihkan Irigasi Desa',
        content: 'Diberitahukan kepada seluruh warga Dusun Karanggayam, akan diadakan kerja bakti pembersihan saluran irigasi menjelang musim tanam. Mohon membawa alat kerja masing-masing.',
        category: 'Kegiatan',
        imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop',
        isFeatured: true,
        isUrgent: false,
        views: 142,
        likes: 35,
        authorId: admin.id,
      },
      {
        title: 'Jadwal Posyandu Balita & Lansia',
        content: 'Kegiatan rutin Posyandu akan dilaksanakan di Balai Dusun pada tanggal 20 bulan ini. Dimohon kehadirannya bagi yang memiliki balita atau lansia.',
        category: 'Kesehatan',
        isFeatured: false,
        isUrgent: false,
        views: 89,
        likes: 12,
        authorId: admin.id,
      },
      {
        title: 'PEMADAMAN LISTRIK SEMENTARA',
        content: 'Info dari PLN: Akan ada pemadaman listrik besok pagi mulai pukul 09:00 - 15:00 WIB karena perbaikan trafo di gardu utama.',
        category: 'Umum',
        isFeatured: false,
        isUrgent: true,
        views: 450,
        likes: 8,
        authorId: admin.id,
      },
      {
        title: 'Penyaluran Bantuan Sosial Tunai (BST)',
        content: 'Bagi warga yang terdaftar sebagai penerima Bantuan Sosial Tunai (BST) tahap 3, harap mengambil bantuan di Balai Desa besok pagi dengan membawa KTP dan KK asli.',
        category: 'Pemerintah',
        imageUrl: 'https://images.unsplash.com/photo-1555845763-71887e59db4b?q=80&w=1200&auto=format&fit=crop',
        isFeatured: true, 
        isUrgent: false,
        views: 320,
        likes: 45,
        authorId: admin.id,
      },
      {
        title: 'Rapat Persiapan Lomba 17 Agustus',
        content: 'Diundang seluruh ketua RT dan RW Karanggayam untuk hadir dalam rapat koordinasi persiapan perlombaan HUT RI yang akan dilaksanakan pada akhir pekan ini.',
        category: 'Kegiatan',
        isFeatured: false,
        isUrgent: false,
        views: 75,
        likes: 10,
        authorId: admin.id,
      },
      {
        title: 'Pelatihan Digitalisasi UMKM Dusun',
        content: 'BUMDes akan mengadakan pelatihan gratis bagi warga yang memiliki usaha kuliner atau kerajinan untuk mulai berjualan secara online. Kuota terbatas untuk 30 orang pendaftar pertama.',
        category: 'Pendidikan',
        isFeatured: false,
        isUrgent: false,
        views: 210,
        likes: 56,
        authorId: admin.id,
      },
      {
        title: 'WASPADA PENIPUAN MENGATASNAMAKAN DESA',
        content: 'Bapak/Ibu warga Karanggayam mohon berhati-hati terhadap oknum yang meminta sumbangan mengatasnamakan perangkat desa. Segala iuran resmi selalu disertai surat bermaterai dan stempel resmi dusun.',
        category: 'Keamanan',
        isFeatured: false,
        isUrgent: true, 
        views: 580,
        likes: 92,
        authorId: admin.id,
      },
      {
        title: 'Jadwal Pengambilan Pupuk Subsidi Kelompok Tani',
        content: 'Diberitahukan kepada anggota Kelompok Tani "Maju Lancar", pupuk subsidi jenis Urea dan NPK sudah tersedia. Silakan diambil di gudang KUD dengan membawa fotokopi KTP dan KK.',
        category: 'Pertanian',
        isFeatured: false,
        isUrgent: false,
        views: 185,
        likes: 24,
        authorId: admin.id,
      },
      {
        title: 'Acara Merti Dusun dan Pagelaran Wayang Kulit',
        content: 'Dalam rangka melestarikan budaya dan wujud syukur hasil panen, Karanggayam akan mengadakan acara Merti Dusun (Bersih Desa) diakhiri dengan pagelaran wayang kulit semalam suntuk di lapangan dusun.',
        category: 'Budaya',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        isFeatured: true,
        isUrgent: false,
        views: 640,
        likes: 112,
        authorId: admin.id,
      },
      {
        title: 'PENUTUPAN JALAN SEMENTARA: Pengecoran Gang RT 04',
        content: 'Akses jalan utama masuk RT 04 akan ditutup total selama 3 hari ke depan karena ada pengerjaan pengecoran jalan rabat beton. Warga diharap menggunakan jalur alternatif melewati RT 05.',
        category: 'Infrastruktur',
        isFeatured: false,
        isUrgent: true,
        views: 310,
        likes: 18,
        authorId: admin.id,
      },
      {
        title: 'Pelaksanaan Fogging Nyamuk DBD',
        content: 'Menindaklanjuti laporan kasus Demam Berdarah, Puskesmas akan melakukan fogging (pengasapan) di area pemukiman warga besok sore. Mohon warga menutup makanan dan penampungan air.',
        category: 'Kesehatan',
        isFeatured: false,
        isUrgent: false,
        views: 425,
        likes: 67,
        authorId: admin.id,
      }
    ],
  });

  // 4. Buat Data Tiket (Layanan Warga / Pengaduan)
  await prisma.ticket.create({
    data: {
      ticketCode: 'TKT-001',
      title: 'Pengajuan Surat Pengantar SKCK',
      description: 'Saya butuh surat pengantar dari desa untuk mengurus SKCK di Polsek guna melamar pekerjaan.',
      category: 'ADMINISTRASI',
      status: 'SELESAI',
      adminNotes: 'Surat sudah dicetak dan ditandatangani. Silakan diambil di meja pelayanan balai dusun ya, Mas Budi.',
      userId: warga.id,
    },
  });

  await prisma.ticket.create({
    data: {
      ticketCode: 'TKT-002',
      title: 'Lapor Jalan Berlubang di RT 03',
      description: 'Ada jalan berlubang cukup dalam di pertigaan RT 03. Mohon segera ditambal karena sangat berbahaya kalau malam hari.',
      category: 'PENGADUAN',
      status: 'MENUNGGU',
      userId: warga.id,
    },
  });

  console.log('✅ Seeding data dummy berhasil!');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });