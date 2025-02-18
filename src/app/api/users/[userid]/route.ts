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

export async function PUT(request: NextRequest) {
  try {
    // validate JWT and get user ID
    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 });
    }

    // parse the request
    const body = await request.json();

    // update the user
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 });
    }
    return NextResponse.json({
      message: 'Profile updated Successfully!',
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'Something went wrong!',
      },
      { status: 500 }
    );
  }
}
