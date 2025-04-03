import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb";
import Member from "@/models/Member";

export async function GET(req, context) {
  await connectToDatabase();
  const { params } = context;

  try {
    const member = await Member.findById(params.id);
    return member
      ? NextResponse.json(member, { status: 200 })
      : NextResponse.json({ message: "Member not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching member" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  await connectToDatabase();
  const { params } = context;

  try {
    const body = await req.json();
    const updatedMember = await Member.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return updatedMember
      ? NextResponse.json(updatedMember, { status: 200 })
      : NextResponse.json({ message: "Member not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating member" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, context) {
  await connectToDatabase();
  const { params } = context;

  try {
    await Member.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting member" },
      { status: 500 }
    );
  }
}
