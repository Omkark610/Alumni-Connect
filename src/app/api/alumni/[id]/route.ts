import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { getAuthPayload } from "@/lib/auth";
import { updateSchema } from "@/lib/validators";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    // validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const doc = await Alumni.findById(params.id).select("-passwordHash -email");
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (error: any) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const auth = getAuthPayload();
  if (!auth || auth.sub !== params.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 });

  const updated = await Alumni.findByIdAndUpdate(params.id, parsed.data, { new: true }).select("-passwordHash");
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}