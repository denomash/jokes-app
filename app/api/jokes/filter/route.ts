import { JokeProps } from "@models/Joke";
import { PageProps } from "@models/PageProps";
import { API_ENDPOINT } from "@utils/constants";
import { NextRequest } from "next/server";

/**
 * filter joke by views
 * @param {Request} request The request
 * @returns {JokeProps} Success or error message
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const views = request.nextUrl.searchParams.get("Views");

    const res = await fetch(`${API_ENDPOINT}?Views=${views}`);

    let data: JokeProps = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}
