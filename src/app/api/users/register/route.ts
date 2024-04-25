import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
connectDb();
export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'User Registration POST api is  working!',
  });
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'user registration using get api method!',
  });
}
