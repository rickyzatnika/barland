import Riders from "@/models/Riders";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  await connect();

  try {
    const rider = await Riders.findById(id);

    return new NextResponse(JSON.stringify(rider), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), { status: 500 });
  }
}

// Edit
export async function PUT(req = NextRequest, { params: { id } }) {
  await connect();
  const body = await req.json();

  try {
    const updateRider = await Riders.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new NextResponse(JSON.stringify(updateRider), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(req = NextRequest, { params: { id } }) {
  await connect();

  try {
    await Riders.findByIdAndDelete(id);
    return new NextResponse(JSON.stringify("deleted Successfully"), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), { status: 500 });
  }
}
