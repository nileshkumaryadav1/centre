import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectToDatabase from "@/lib/mongoDb";

export async function GET() {
  await connectToDatabase();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}

export async function POST(req) {
  await connectToDatabase();
  const { title, imageUrl, content, author } = await req.json();

  if (!title || !imageUrl || !content || !author) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const newBlog = new Blog({ title, imageUrl, content, author });
  await newBlog.save();
  return NextResponse.json({ message: "Blog added successfully" });
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { title, imageUrl, content, author } = await req.json();
  await Blog.findByIdAndUpdate(params.id, { title, imageUrl, content, author });
  return NextResponse.json({ message: "Blog updated successfully" });
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Blog deleted successfully" });
}
