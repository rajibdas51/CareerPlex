import User from '@/models/userModel';
import { validateJWT } from './../../../../helpers/validateJWT';
import { NextRequest, NextResponse } from 'next/server';
import { Next } from 'react-bootstrap/esm/PageItem';

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    console.log('token', request.cookies.get('token'));
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
