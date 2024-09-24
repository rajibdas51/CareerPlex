import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
connectDb();
export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.findByIdAndUpdate(
      params.applicationId,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json({
      message: 'Job Status updated Successfully!',
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
