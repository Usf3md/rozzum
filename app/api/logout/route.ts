import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = new NextResponse();
  response.cookies.set("AuthToken", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  return response;
}
