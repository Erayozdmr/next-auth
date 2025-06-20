// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log ile kontrol edebilirsin
  console.log("Middleware token:", token);

  const url = req.nextUrl.clone();

  // Eğer token yoksa ve istek korunan sayfaya ise login sayfasına yönlendir
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Token varsa isteğe devam et
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
