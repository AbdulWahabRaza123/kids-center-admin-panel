import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookies = req.cookies;
  const temp = cookies.get("user")?.value;
  console.log("This is temp ", temp);
  if (!temp) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  //   const user = JSON.parse(temp);
  //   const role = user.role;

  //   if (!role || !["admin", "user"].includes(role)) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   if (role === "user" && !url.pathname.startsWith("/users")) {
  //     return NextResponse.redirect(new URL("/users/scenario", req.url));
  //   }

  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
