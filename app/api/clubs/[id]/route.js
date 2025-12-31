import connectToDatabase from "@/lib/mongoDb";
import Club from "@/models/Club";
import { NextResponse } from "next/server";

// GET: Fetch a single club by ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const club = await Club.findById(params.id);
    if (!club) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }
    return NextResponse.json(club);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching club", error },
      { status: 500 }
    );
  }
}

// PUT: Update a Club by ID
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedClub = await Club.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedClub) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }
    return NextResponse.json(updatedClub);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating club", error },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Club by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const deletedClub = await Club.findByIdAndDelete(params.id);
    if (!deletedClub) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Club deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting club", error },
      { status: 500 }
    );
  }
}
