import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb";
import Member from "@/models/Member";

export async function GET(_, { params }) {
    await connectToDatabase();
    const member = await Member.findById(params.id);
    return member
        ? NextResponse.json(member, { status: 200 })
        : NextResponse.json({ message: "Member not found" }, { status: 404 });
}

export async function PUT(req, { params }) {
    await connectToDatabase();
    try {
        const body = await req.json();
        const updatedMember = await Member.findByIdAndUpdate(params.id, body, { new: true });
        return updatedMember
            ? NextResponse.json(updatedMember, { status: 200 })
            : NextResponse.json({ message: "Member not found" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(_, { params }) {
    await connectToDatabase();
    await Member.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Member deleted" });
}
