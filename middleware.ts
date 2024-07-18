import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookies = req.cookies;
  const temp = cookies.get("user")?.value;
  if (!temp) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // const user = JSON.parse(temp);
  // if (user.role === "admin") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
