import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
connectDb();
export async function PUT(request: NextRequest) {
  try {
    // validate the requset by JWT
    await validateJWT(request);
    const reqBody = await request.json();
    const updatedUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      throw new Error('User not Found!');
    }

    return NextResponse.json({
      message: 'User Updated Successfully',
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
