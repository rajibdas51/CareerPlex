import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { sendEmail } from '@/helpers/sendEmail';
import { revalidatePath } from 'next/cache';
connectDb();
export async function POST(request: NextRequest) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const application: any = await Application.create(reqBody);

    const applicationData: any = await Application.findById(application._id)
      .populate('user') // This is the jobseeker
      .populate({
        path: 'job',
        populate: {
          path: 'user', // this is the employer
        },
      });

    await sendEmail({
      to: applicationData.job.user.email,
      subject: 'New applicationdata received.',
      text: `You have received a new applicationdata from ${applicationData.user.name}`,
      html: `<div>
        <p>You have received a new applicationdata from ${applicationData.user.name}</p>
        <p>Applicant's name is: ${applicationData.user.name}</p>
        <p>Applicant's email: ${applicationData.user.email}</p>
        <p>Applican'ts phone number: ${applicationData.user.phone}</p>
      </div>`,
    });

    return NextResponse.json({
      message: 'You Successfully applied for this job!',
      data: applicationData,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    validateJWT(request);
    // fetch query string parameters from the request

    const searchParams = new URL(request.url);
    const user = searchParams.searchParams.get('user');
    const job = searchParams.searchParams.get('job');
    const filterObj: any = {};
    if (user) {
      filterObj['user'] = user;
    }
    if (job) {
      filterObj['job'] = job;
    }
    const applications = await Application.find(filterObj)
      .populate('user')
      .populate({
        path: 'job',
        populate: {
          path: 'user',
        },
      });
    return NextResponse.json({
      message: 'ApplicationData fetched successfully!',
      data: applications,
    });
    revalidatePath('/');
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
