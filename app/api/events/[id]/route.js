import connectToDatabase from "@/lib/mongoDb";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

// GET: Fetch a single Event by ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching event", error },
      { status: 500 }
    );
  }
}

// PUT: Update a Event by ID
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedEvent = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating event", error },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Event by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(params.id);
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting event", error },
      { status: 500 }
    );
  }
}
