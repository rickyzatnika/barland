import Riders from "@/models/Riders";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req = NextRequest, { params: { id } }) {
  await connect();
  const isPayment = await req.json();

  try {
    // Cek apakah nomor start sudah digunakan oleh pembalap lain
    const updateRider = await Riders.findByIdAndUpdate(
      id,
      { $set: { isPayment } },
      { new: true }
    );

    return new NextResponse(JSON.stringify(updateRider), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Mohon maaf ada kesalahan server!" }),
      { status: 500 }
    );
  }
}
