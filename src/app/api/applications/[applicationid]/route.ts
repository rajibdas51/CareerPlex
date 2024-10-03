import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { sendEmail } from '@/helpers/sendEmail';
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

    await sendEmail({
      to: application.user.email,
      subject: 'Your application status has been updated!',
      text: `Your application status has been updated to ${application.status}`,
      html: `
      <div>
      <p>Your application status has been updated to ${application.status} </p>
      </div>
      </br>
      <p>Thanks for using CareerPlex!</p>
      `,
    });
    return NextResponse.json({
      message: 'Job Status updated Successfully!',
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
