import { NextRequest } from "next/server";

import { JokeProps } from "@models/Joke";
import { API_ENDPOINT } from "@utils/constants";

/**
 * Get all jokes
 */
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const limit = request.nextUrl.searchParams.get("limit");

  try {
    const res = await fetch(`${API_ENDPOINT}?_page=${page}&_limit=${limit}`);

    let data: JokeProps[] = await res.json();

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}

/**
 * Create new joke
 */
export async function POST(request: NextRequest) {
  const { Author, Title, Body, Views } = await request.json();

  try {
    const res = await fetch(`${API_ENDPOINT}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Author,
        Title,
        Body,
        Views: Views ?? "50",
        CreatedAt: new Date().getTime(),
      }),
    });

    let data: JokeProps = await res.json();

    return new Response(JSON.stringify({ id: data.id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}
