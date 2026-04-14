import { NextResponse } from "next/server";
import { announcementService } from "@/modules/announcement/service";

// --- METHOD GET: Buat ambil data ---
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : undefined;
    const category = searchParams.get("category");

    let data = await announcementService.getAllAnnouncements({ limit, offset });

    // Filter by category if provided and not "All"
    if (category && category !== "All") {
      data = data.filter((announcement) => announcement.category === category);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Gagal ambil data" },
      { status: 500 },
    );
  }
}

// --- METHOD POST: Buat nambah data baru ---
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Lempar ke service buat diproses
    const newData = await announcementService.createAnnouncement(body);

    return NextResponse.json(
      { success: true, message: "Pengumuman berhasil dibuat!", data: newData },
      { status: 201 },
    );
  } catch (error: any) {
    // Tangkap error validasi dari service
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
