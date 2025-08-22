import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { getAuthPayload } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const auth = getAuthPayload();
  if (!auth) return NextResponse.json({ user: null });
  const user = await Alumni.findById(auth.sub).select("-passwordHash");
  return NextResponse.json({ user });
}