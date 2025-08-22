import { dbConnect } from "@/lib/db";
import Alumni from "@/models/Alumni";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    await dbConnect();
    console.log("✅ Connected to DB");

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 5;
    const skip = (page - 1) * limit;

    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    console.log("🔍 Filter:", filter);

    const alumni = await Alumni.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await Alumni.countDocuments(filter);

    return NextResponse.json({
      alumni,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err: any) {
    console.error("❌ API Error:", err.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.passoutYear || !body.password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(body.password, 10);

    // Create new alumni document
    const newAlumni = new Alumni({
      name: body.name,
      email: body.email,
      passoutYear: body.passoutYear,
      passwordHash,
      socials: {
        linkedin: body.linkedin || "",
        instagram: body.instagram || "",
        linktree: body.linktree || "",
      },
    });

    await newAlumni.save();

    return NextResponse.json(
      {
        success: true,
        alumni: {
          _id: newAlumni._id,
          name: newAlumni.name,
          email: newAlumni.email,
          passoutYear: newAlumni.passoutYear,
          socials: newAlumni.socials,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating alumni:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}