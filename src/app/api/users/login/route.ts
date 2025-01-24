import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Validate user and password
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error(`User doesn't exist!`);
    }

    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid Password!');
    }

    // Create token with explicit console logging
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        iat: Math.floor(Date.now() / 1000), // issued at timestamp
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      }
    );

    console.log('Generated Token:', token); // Debug token generation

    const response = NextResponse.json(
      {
        message: 'Login Successful!',
        success: true,
        token: token, // Include token in response for debugging
      },
      { status: 200 }
    );

    // Ensure cookies are set correctly
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error); // Log any errors
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
