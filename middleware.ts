import { NextRequest, NextResponse } from "next/server";
const adminRoutes = ["/", "/activities", "/attendance", "/communication", "/profile", "/user-manage", "/report", "/parent-files"]
const financeRoutes = ["/finance"]
const protectedRoutes = ["/", "/activities", "/attendance", "/communication", "/profile", "/user-manage", "/report", "/parent-files", "/finance"]
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookies = req.cookies;
  const temp = cookies.get("user")?.value;
  if (!temp) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  const user = JSON.parse(temp);
  if (user.role === "admin" && financeRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (user.role === "finance" && adminRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/finance", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: protectedRoutes
};
