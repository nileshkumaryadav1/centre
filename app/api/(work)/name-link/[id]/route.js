import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoDb';
import NameLink from '@/models/NameLink';

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await NameLink.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
