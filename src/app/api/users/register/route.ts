import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import next from 'next';
connectDb();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // check if user already exists
    const userExists = await User.findOne({ email: reqBody.email });
    if (userExists) {
      throw new Error('User already exists!');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // create new user
    await User.create(reqBody);
    return NextResponse.json(
      {
        message: 'User created Successfully!',
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
