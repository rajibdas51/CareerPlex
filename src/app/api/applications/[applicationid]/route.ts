import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
connectDb();

export async function PUT(request: NextRequest, { params }: any) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    console.log(reqBody, params);
    const application: any = await Application.findByIdAndUpdate(
      params.applicationid,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user')
      .populate({
        path: 'job',
        populate: {
          path: 'user',
        },
      });

    return NextResponse.json({
      message: 'Job Status updated Successfully!',
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
