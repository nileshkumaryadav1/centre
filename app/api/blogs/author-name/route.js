import connectToDatabase from "@/lib/mongoDb";
import Blog from "@/models/Blog"; // Assuming this is your Blog model
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const author = searchParams.get("author");
  
  await connectToDatabase();

  let blogs;

  if (author) {
    blogs = await Blog.find({ author }).sort({ createdAt: -1 });
  } else {
    return NextResponse.json({ error: "Author name is required" }, { status: 400 });
  }

  return NextResponse.json(blogs);
}
