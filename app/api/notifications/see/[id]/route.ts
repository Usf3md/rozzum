import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: number }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const response = await fetch(
    `https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/notifications/${
      (
        await params
      ).id
    }/seen`,
    {
      method: "POST",
      headers: request.headers,
    }
  );
  return NextResponse.json(
    { status: response.status },
    { status: response.status }
  );
}