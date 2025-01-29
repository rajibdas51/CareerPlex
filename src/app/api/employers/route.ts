import { connectDb } from '@/config/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connectDb();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;
    const skip = (page - 1) * limit;

    const employers = await User.find({ userType: 'employer' })
      .limit(limit)
      .skip(skip)
      .select('-password');

    const total = await User.countDocuments({ userType: 'employer' });

    return NextResponse.json({
      data: employers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
