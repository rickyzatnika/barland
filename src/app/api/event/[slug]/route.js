import Events from "@/models/Event";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req = NextRequest, { params }) {
  await connect();
  const { slug } = params;

  try {
    const event = await Events.findOne({ slug });

    if (!event) {
      return new NextResponse(JSON.stringify({ message: "Event not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
