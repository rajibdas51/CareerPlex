import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import User from '@/models/userModel';
import Job from '@/models/jobModel';
import { NextRequest, NextResponse } from 'next/server';
connectDb();
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    if (!userId) {
      return NextResponse.json(
        { message: 'Unauthorized User!' },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).populate({
      path: 'savedJobs',
      model: 'jobs',
      populate: { path: 'user', model: 'users', select: 'name avatar' }, // Populate employer info
    });
    if (!user) {
      return NextResponse.json(
        { message: ' User not Found!' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: 'Saved jobs fetched successfully!',
      savedJobs: user.savedJobs,
    });
  } catch (error: any) {
    console.error('Error fetching saved jobs:', error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await validateJWT(request);

    if (!userId) {
      return NextResponse.json(
        {
          message: 'Unauthorized user. Please login to save jobs.',
        },
        { status: 401 }
      );
    }
    const { jobId } = await request.json();

    if (!jobId) {
      return NextResponse.json(
        { message: 'Job ID is required!' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // check if job is already saved
    const isSaved = user.savedJobs?.some(
      (id: string) => id.toString() === jobId
    );

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(
        (id: string) => id.toString() !== jobId
      );
    } else {
      user.savedJobs = [...(user.savedJobs || []), jobId];
    }

    await user.save();

    // The issue is right here - you forgot to return the response
    return NextResponse.json({
      message: isSaved ? 'Job removed from Saved!' : 'Job saved Successfully!',
      savedJobs: user.savedJobs,
    });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      {
        message: error.message || 'Something went Wrong!',
      },
      { status: 500 }
    );
  }
}
