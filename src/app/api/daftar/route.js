import Riders from "@/models/Riders";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

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
    recaptchaToken,
  } = await req.json();

  // Verifikasi token reCAPTCHA
  const recaptchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(recaptchaVerificationUrl);
    const { success } = response.data;

    if (!success) {
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
    return new NextResponse("Registered Successfully", { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
};
