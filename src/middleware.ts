import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log("Middleware!");
  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
