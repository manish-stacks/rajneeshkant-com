import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page itself (/admin) is public.
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  // Everything else under /admin/* requires a valid token.
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/admin", request.url));
    res.cookies.delete("admin_token");
    return res;
  }
}

export const config = {
  // Protect all admin sub-routes (login page handled above).
  matcher: ["/admin/:path+"],
};
