import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import User from '@/models/userModel';

connectDb();

export async function GET(request: NextRequest, { params }: any) {
  try {
    const employer = await User.findById(params.employerid).select('-password');

    if (!employer) {
      return NextResponse.json(
        { message: 'Employer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: employer });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
