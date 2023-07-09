import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

const DATA_URL = "https://jsonplaceholder.typicode.com/todos";

// Get request
export async function GET() {
  const res = await fetch(DATA_URL);
  const todos = await res.json();
  return NextResponse.json(todos);
}

// Delete request
export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ message: "Todo id required" });
  }

  await fetch(`${DATA_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
    },
  });

  return NextResponse.json({ message: `Todo No. ${id} deleted!` });
}

// Post Request
export async function POST(request: Request) {
  const { userId, title } = await request.json();
  if (!userId || !title) {
    return NextResponse.json({ message: " Required data is missing!" });
  }

  const res = await fetch(DATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}

// Put Request
export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json();
  if (!userId || !title || !id || typeof completed !== "boolean") {
    return NextResponse.json({ message: " Required data is missing!" });
  }

  const res = await fetch(`${DATA_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
}
