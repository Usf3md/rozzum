import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(
    "https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/api/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return response;
}
