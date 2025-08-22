import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Alumni from "@/models/Alumni";
import bcrypt from "bcryptjs";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

  const user = await Alumni.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ sub: user._id.toString(), email: user.email });
  setAuthCookie(token);
  return NextResponse.json({ id: user._id.toString(), email: user.email, name: user.name });
}