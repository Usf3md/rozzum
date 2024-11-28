import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(
    "https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const responseBody = await response.json();
  const newResponse = NextResponse.json(responseBody, { status: 200 });
  const cookies = response.headers.get("set-cookie");
  if (cookies !== null) newResponse.headers.set("set-cookie", cookies);

  return newResponse;
}
