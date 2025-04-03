import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDb";
import Birthday from "@/models/Birthday";
import mongoose from "mongoose";

export async function PUT(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const body = await req.json();
        const updatedBirthday = await Birthday.findByIdAndUpdate(id, body, { new: true });

        if (!updatedBirthday) {
            return NextResponse.json({ error: "Birthday not found" }, { status: 404 });
        }

        return NextResponse.json(updatedBirthday);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update birthday" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const deletedBirthday = await Birthday.findByIdAndDelete(id);

        if (!deletedBirthday) {
            return NextResponse.json({ error: "Birthday not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Birthday deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete birthday" }, { status: 500 });
    }
}
