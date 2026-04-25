import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/admin", "/content-admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const configuredToken = process.env.ADMIN_ROUTE_TOKEN;
  const suppliedToken = request.headers.get("x-admin-token");

  if (!configuredToken || suppliedToken !== configuredToken) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/content-admin/:path*"]
};
