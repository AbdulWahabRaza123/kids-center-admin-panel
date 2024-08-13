import { NextRequest, NextResponse } from "next/server";
const financePaths = [
  "/",
  "/user-manage",
  "/activities",
  "/fee",
  "/comments",
  "/feedbacks",
  "/attendance",
  "/files"
]
const adminPaths = [
  "/finance",
  "/finance/fee"
]
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookies = req.cookies;
  const temp = cookies.get("user")?.value;
  if (!temp) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  const user = JSON.parse(temp);
  if (user.role === "admin" && adminPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (user.role === "finance" && financePaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/finance", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/finance", "/finance/fee"],
};
