import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { sendEmail } from '@/helpers/sendEmail';
import moment from 'moment';
import { revalidatePath } from 'next/cache';
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
      <p>Your application status has been updated to ${
        application.status
      } </p>   

     <p>Company:${application.job.user.name}</p>  
     <p>Job Title:${application.job.title}</p>  
     <p>Applied On:${moment(application.createdAt).format('DD/MM/YYYY')}</p>

        </br>
     <p>Thanks for using CareerPlex!</p>

      </div>
   
      `,
    });
    return NextResponse.json({
      message: 'Job Status updated Successfully!',
      data: application,
    });
    revalidatePath('/');
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
