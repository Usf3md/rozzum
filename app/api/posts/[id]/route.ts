import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: number }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const response = await fetch(
    `https://hackathonknowledgeshare-h2b3eegufpdsd8g4.eastus2-01.azurewebsites.net/api/posts/${
      (
        await params
      ).id
    }`,
    {
      method: "GET",
      headers: request.headers,
    }
  );
  const body = await response.json();

  return NextResponse.json(body, { status: response.status });
}
