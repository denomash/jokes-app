import { JokeProps } from "@models/Joke";
import { PageProps } from "@models/PageProps";
import { API_ENDPOINT } from "@utils/constants";
import { NextRequest } from "next/server";

/**
 * Get joke by id
 * @param {Request} request The request
 * @returns {JokeProps} Success or error message
 */
export async function GET(
  request: Request,
  { params }: PageProps
): Promise<Response> {
  try {
    const res = await fetch(`${API_ENDPOINT}/${params.id}`);

    let data: JokeProps = await res.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}

/**
 * Update joke by id
 * @param {Request} request The request
 * @returns {JokeProps} Success or error message
 */
export async function PUT(
  request: NextRequest,
  { params }: PageProps
): Promise<Response> {
  const { Author, Title, Body, Views } = await request.json();

  try {
    const res = await fetch(`${API_ENDPOINT}/${params.id}`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        Author,
        Title,
        Body,
        Views: Views ?? '50',
        CreatedAt: new Date().getTime()
      }),
    });

    let data = await res.json();

    return new Response(JSON.stringify({ message: "Update successfull.", ...data }));
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}

/**
 * Delete joke
 * @param {Request} request The request
 * @returns {JokeProps} Success or error message
 */
export async function DELETE(
  request: Request,
  { params }: PageProps
): Promise<Response> {
  try {
    await fetch(`${API_ENDPOINT}/${params.id}`, {
      method: "DELETE",
    });

    return new Response(JSON.stringify({ message: "Deletion successfull." }));
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occured!" }), {
      status: 400,
    });
  }
}
