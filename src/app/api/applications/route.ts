import Application from '@/models/applicationModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
connectDb();
export async function POST(request: NextRequest) {
  try {
    validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.create(reqBody);
    return NextResponse.json({
      message: 'You Successfully applied for this job!',
      data: application,
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
      .populate('job');
    return NextResponse.json({
      message: 'Applications fetched successfully!',
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
