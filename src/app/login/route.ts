import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import next from 'next';
import jwt from 'jsonwebtoken';
connectDb();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists
    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      throw new Error(`User doesn't exists!`);
    }

    // Compare password
    const validPassword = await bcrypt.compare(reqBody.password, user.password);

    if (!validPassword) {
      throw new Error('Invalid Password!');
    }

    // create and Assign a token
    const dataTobeSigned = {
      userId: user._id,
      email: user.email,
    };
    const token = jwt.sign(dataTobeSigned, process.env.jwt_secret, {
      expiresIn: '1d',
    });

    const response = NextResponse.json(
      {
        message: ' Login Successfull!',
        success: true,
      },
      { status: 200 }
    );

    // set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
