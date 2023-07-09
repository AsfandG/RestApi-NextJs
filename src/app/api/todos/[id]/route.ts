import { NextResponse } from "next/server";

const DATA_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const response = await fetch(`${DATA_URL}/${id}`);
  const todo = await response.json();

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" });
  }
  return NextResponse.json({ todo });
}
