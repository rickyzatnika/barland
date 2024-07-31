import connect from "@/utils/connect";
import Riders from "@/models/Riders";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();

  try {
    const riders = await Riders.find({}, "numberStart");
    const takenNumbers = riders.map((rider) => rider?.numberStart);
    return new NextResponse(JSON.stringify(takenNumbers), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
