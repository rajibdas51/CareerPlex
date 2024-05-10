import User from '@/models/userModel';
import { validateJWT } from './../../../../helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';

import { connectDb } from '@/config/dbConfig';

connectDb();
export async function GET(request: NextRequest) {
  try {
    // get the user id from the token
    const userId = await validateJWT(request);
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found!!');
    }
    return NextResponse.json({
      message: 'User data fetched Successfully!',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
