import Events from "@/models/Event";
import connect from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req = NextRequest) => {
  await connect();
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q")?.trim(); // Trim to avoid unnecessary spaces
    let events;

    if (query) {
      const searchRegex = new RegExp(query, "i"); // Case-insensitive search
      events = await Events.find({
        $or: [{ category: searchRegex }, { title: searchRegex }],
      }).limit(100);
    } else {
      events = await Events.find({}).limit(100); // Limit the results
    }

    return new NextResponse(JSON.stringify({ events, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching events:", error); // Log more detailed error
    return new NextResponse(
      JSON.stringify({ message: "Internal server error", success: false }),
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
    });
    await newEvents.save();
    return NextResponse.json(
      { message: "Event created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving event:", error);
    return NextResponse.json(
      { error: "Failed to save event." },
      { status: 500 }
    );
  }
};
