import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(
    "https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/api/user/profile",
    {
      method: "GET",
      headers: request.headers,
    }
  );
  const body = await response.json();
  return NextResponse.json(body, { status: response.status });
}
