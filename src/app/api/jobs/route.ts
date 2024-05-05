import Job from '@/models/jobModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { message } from 'antd';
connectDb();
export async function POST(request: NextRequest) {
  try {
    const userId = await validateJWT(request);

    if (!userId) {
      return NextResponse.json(
        { message: 'Invalid token, please login again', data: null },
        { status: 401 }
      );
    }
    const reqBody = await request.json();
    const job = await Job.create({ ...reqBody, user: userId });
    return NextResponse.json({
      message: 'Job created Successfully!',
      data: job,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
