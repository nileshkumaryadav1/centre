import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb"; // Ensure this file exists
import Service from "@/models/Service"; // Ensure this import is correct

// ✅ Connect to DB
connectToDatabase();

export async function POST(req) {
  try {
    const body = await req.json();
    const newService = new Service(body);
    await newService.save();

    return NextResponse.json(
      { message: "Service created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving service", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  connectToDatabase();
  const services = await Service.find();
  return new Response(JSON.stringify(services));
}
