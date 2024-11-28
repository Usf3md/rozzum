import { Post } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(
    "https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/api/comment",
    {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(body),
    }
  );

  return NextResponse.json(
    { status: response.status },
    { status: response.status }
  );
}
