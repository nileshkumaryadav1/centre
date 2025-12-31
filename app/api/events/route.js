import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb"; // Ensure this file exists
import Event from "@/models/Event"; // Ensure this import is correct

// ✅ Connect to DB
connectToDatabase();

export async function POST(req) {
  try {
    const body = await req.json();
    const newEvent = new Event(body);
    await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving event", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  connectToDatabase();
  const events = await Event.find();
  return new Response(JSON.stringify(events));
}
