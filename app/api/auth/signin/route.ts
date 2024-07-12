import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@/lib/client";
import { DBUser } from "@/interface/user-interface";
export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { email, password } = await req.json();
    const cookieStore = cookies();
    const res = await client.post("/auth/login", {
      email,
      password,
    });
    if (!res) {
      return NextResponse.json({ res: "Unauthorized" }, { status: 401 });
    }
    const user = res.data.user;
    console.log("This is user ", user)
    if (user.role === "admin" || user.role === "finance") {
      console.log("check has been passed")
      cookieStore.set("user", JSON.stringify(user), { httpOnly: true });
      return NextResponse.json({ user: res.data }, { status: 201 });
    } else {
      return NextResponse.json({ res: "Unauthorized" }, { status: 401 });
    }

  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ res: "error" }, { status: 500 });
  }
}
