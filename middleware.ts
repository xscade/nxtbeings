import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isSecure = request.url.startsWith("https://");

  // Get token (Edge-compatible)
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: isSecure,
  });

  const isLoggedIn = !!token;

  // Protected routes
  const protectedRoutes = ["/dashboard", "/onboarding"];
  const authRoutes = ["/signin", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    if (!token?.onboardingCompleted) {
      return NextResponse.redirect(
        new URL(`/onboarding/${token?.role}`, request.url)
      );
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect non-logged-in users to signin
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  // Redirect to onboarding if not completed
  if (
    isLoggedIn &&
    pathname.startsWith("/dashboard") &&
    !token?.onboardingCompleted
  ) {
    return NextResponse.redirect(
      new URL(`/onboarding/${token?.role}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/signin",
    "/signup",
  ],
};
