import RaceClasses from "@/models/RaceClasses";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req = NextRequest) => {
  await connect();
  try {
    const raceClass = await RaceClasses.find({});

    return new NextResponse(JSON.stringify(raceClass), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "internal server error" }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req = NextRequest) => {
  await connect();

  const { name, price } = await req.json();

  try {
    const newRaceClass = new RaceClasses({
      name,
      price,
    });
    await newRaceClass.save();
    return new NextResponse("Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
