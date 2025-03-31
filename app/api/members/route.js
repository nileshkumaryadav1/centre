import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb";
import Member from "@/models/Member";

export async function GET() {
    await connectToDatabase();
    const members = await Member.find({});
    return NextResponse.json(members, { status: 200 });
}

export async function POST(req) {
    await connectToDatabase();
    try {
        const body = await req.json();
        const newMember = await Member.create(body);
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
