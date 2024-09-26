import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
connectDb();
export async function GET(request: NextRequest, { params }: any) {
  try {
    await validateJWT(request);

    const user = await User.findById(params.userid).select('-password');
    if (!user) {
      throw new Error('No user Found!');
    }
    return NextResponse.json({
      message: 'User data fetched Successfully!',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong!' },
      { status: 500 }
    );
  }
}
