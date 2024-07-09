import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@/lib/client";
import { DBUser } from "@/interface/user-interface";
export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { email, password } = await req.json();
    const cookieStore = cookies();
    const res = await client.post("/api/auth/login", {
      email,
      password,
    });
    console.log("This is res ", res);
    if (!res) {
      return NextResponse.json({ res: "Unauthorized" }, { status: 401 });
    }
    const user: DBUser = res.data.user;
    cookieStore.set("user", JSON.stringify(user), { httpOnly: true });
    return NextResponse.json({ user: res.data }, { status: 201 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ res: "error" }, { status: 500 });
  }
}
