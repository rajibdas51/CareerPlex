import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
connectDb();

export async function PUT(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json(
        { message: 'Job ID is required!' },
        { status: 400 }
      );
    }

    const user = await User.findById({ userId });

    const isSaved = user.savedJobs.includes(jobId);
    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(
        (id: String) => id.toString() !== jobId
      );
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    NextResponse.json({
      message: isSaved ? 'Job removed from Saved!' : 'Job saved Successfully!',
      savedJobs: user.savedJobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || 'Something went Wrong!',
      },
      { status: 500 }
    );
  }
}
