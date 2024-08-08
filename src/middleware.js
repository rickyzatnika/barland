import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.headers.get("authorization");

  if (!token || token !== `Bearer ${JWT_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Hanya berlaku untuk rute API
};
