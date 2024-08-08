import Riders from "@/models/Riders";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req = NextRequest) => {
  await connect();
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");
    let riders;

    if (query) {
      const searchRegex = new RegExp(query, "i"); // Case-insensitive search
      riders = await Riders.find({
        $or: [{ name: searchRegex }, { kis: searchRegex }],
      });
    } else {
      riders = await Riders.find({});
    }

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
    recaptchaToken,
  } = await req.json();

  try {
    if (!recaptchaToken) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid reCAPTCHA" }),
        { status: 400 }
      );
    }

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
    return new NextResponse(
      JSON.stringify({ message: "Registered Successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
