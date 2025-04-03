import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb";
import Birthday from "@/models/Birthday";

export async function GET() {
    try {
        await connectToDatabase();
        const birthdays = await Birthday.find().sort({ createdAt: -1 });
        return NextResponse.json(birthdays);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch birthdays" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const newBirthday = await Birthday.create(body);
        return NextResponse.json(newBirthday, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add birthday" }, { status: 500 });
    }
}
