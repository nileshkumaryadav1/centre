import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/mongoDb";

// Fetch single blog by ID
export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Fix: Properly handle the PUT request
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { title, imageUrl, content, author } = await req.json(); // Get request body

    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id, 
      { title, imageUrl, content, author },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ message: "Error updating blog", error }, { status: 500 });
  }
}

// Delete blog by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
