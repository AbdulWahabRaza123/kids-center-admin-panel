import { UserDetails } from "@/interface/user-interface";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(req: Request, res: NextApiResponse) {
  const cookieStore = cookies();
  try {
    const user = cookieStore.get("user");
    if (user) {
      const temp: UserDetails = JSON.parse(user.value);
      return NextResponse.json(
        { verified: true, role: temp.role },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ verified: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ res: "error" }, { status: 500 });
  }
}
