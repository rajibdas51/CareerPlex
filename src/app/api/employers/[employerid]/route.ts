import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import User from '@/models/userModel';

connectDb();

export async function GET(request: NextRequest) {
  try {
    const { employerId } = request.params;
    const employer = await User.findById(employerId).select('-password');

    if (!employer) {
      return NextResponse.json(
        { message: 'Employer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(employer);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
