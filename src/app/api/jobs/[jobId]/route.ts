import Job from '@/models/jobModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { revalidatePath } from 'next/cache';
connectDb();
export async function GET(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const job = await Job.findById(params.jobId).populate('user');
    return NextResponse.json({
      message: 'Job fetched successfully!',
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const updatedJob = await Job.findByIdAndUpdate(params.jobId, reqBody, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: 'Job updated successfully!',
      data: updatedJob,
    });
    revalidatePath('/jobs');
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const job = await Job.findByIdAndDelete(params.jobId);
    return NextResponse.json({
      message: 'Job deleted successfully!',
      data: job,
    });
    revalidatePath('/');
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
