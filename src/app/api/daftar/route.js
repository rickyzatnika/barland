import Riders from "@/models/Riders";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req = NextRequest) => {
  await connect();
  try {
    const riders = await Riders.find({});

    return new NextResponse(JSON.stringify(riders), { status: 200 });
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

  const {
    name,
    address,
    phone,
    team,
    kis,
    nik,
    numberStart,
    raceClass,
    img,
    totalPrice,
  } = await req.json();

  if (nik.length !== 16 || nik.length > 16) {
    return new NextResponse(
      JSON.stringify({
        message: "NIK Invalid, pastikan tidak lebih dari 16 digit.",
      }),
      { status: 400 }
    );
  }

  try {
    const newRiders = new Riders({
      name,
      address,
      phone,
      team,
      kis,
      nik,
      numberStart,
      img,
      raceClass,
      totalPrice,
    });
    await newRiders.save();
    return new NextResponse("Registered Successfully", { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
