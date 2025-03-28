import connectToDatabase from "@/lib/mongoDb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// GET: Fetch a single service by ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const service = await Service.findById(params.id);
    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching service", error }, { status: 500 });
  }
}

// PUT: Update service by ID
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const updatedService = await Service.findByIdAndUpdate(params.id, body, { new: true });

    if (!updatedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ message: "Error updating service", error }, { status: 500 });
  }
}

// DELETE: Remove a service by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const deletedService = await Service.findByIdAndDelete(params.id);
    if (!deletedService) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting service", error }, { status: 500 });
  }
}
