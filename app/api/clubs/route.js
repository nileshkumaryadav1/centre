import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb"; // Ensure this file exists
import Club from "@/models/Club";

// ✅ Connect to DB
connectToDatabase();

export async function POST(req) {
  try {
    const body = await req.json();
    const newClub = new Club(body);
    await newClub.save();

    return NextResponse.json(
      { message: "Club created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving club", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  connectToDatabase();
  const clubs = await Club.find();
  return new Response(JSON.stringify(clubs));
}
