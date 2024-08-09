import Events from "@/models/Event";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req = NextRequest) => {
  await connect();
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q");
    let events;

    if (query) {
      const searchRegex = new RegExp(query, "i"); // Case-insensitive search
      events = await Events.find({
        $or: [{ category: searchRegex }, { title: searchRegex }],
      });
    } else {
      events = await Events.find({});
    }

    return new NextResponse(JSON.stringify(events), { status: 200 });
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
  const { title, desc, content, imageUrl, url, category, publishedAt, slug } =
    await req.json();

  try {
    const newEvents = new Events({
      title,
      desc,
      content,
      imageUrl,
      url,
      category,
      slug,
      publishedAt,
    });
    await newEvents.save();
    return new NextResponse({ status: 201 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "Mohon maaf, ada kesalahan pada server" }),
      { status: 500 }
    );
  }
};
