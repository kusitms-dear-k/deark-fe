import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/sign-up") {
    if (request.cookies.get("ROLE")?.value === "GUEST") {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    } else if (request.cookies.get("ROLE")?.value === "CUSTOMER") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (request.nextUrl.pathname === "/home") {
    if (request.cookies.get("ROLE")?.value === "CUSTOMER" || request.cookies.get("ROLE")?.value === "OWNER") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  if (request.nextUrl.pathname === "/search") {
    if (request.cookies.get("ROLE")?.value === "CUSTOMER" || request.cookies.get("ROLE")?.value === "OWNER") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  if (request.nextUrl.pathname === "/event") {
    if (request.cookies.get("ROLE")?.value === "CUSTOMER") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }

  if (request.nextUrl.pathname === "/mypage") {
    if (request.cookies.get("ROLE")?.value === "CUSTOMER") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-up", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-up", "/home", "/search", "/event", "/mypage"],
};
