import { NextResponse } from "next/server";

export function proxy(request) {
  // Get token from cookie
  const token = request.cookies.get("token")?.value;

  // Token nahi hai -> signin page
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Token available -> allow request
  return NextResponse.next();
}

export const config = {
  matcher: "/checkout",
};
