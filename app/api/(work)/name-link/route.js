import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoDb';
import NameLink from '@/models/NameLink';

export async function GET() {
  await connectToDatabase();
  const items = await NameLink.find();
  return NextResponse.json(items);
}

export async function POST(req) {
  await connectToDatabase();
  const { name, link } = await req.json();
  const newItem = await NameLink.create({ name, link });
  return NextResponse.json(newItem);
}
