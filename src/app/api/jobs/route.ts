import Job from '@/models/jobModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
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

export async function GET(request: NextRequest) {
  try {
    //validating the user request
    validateJWT(request);
    // fetch query string parameters from the request
    const searchParams = new URL(request.url);
    const user = searchParams.searchParams.get('user');
    const searchText = searchParams.searchParams.get('searchText');
    const location = searchParams.searchParams.get('location');
    const filterObj: any = {};
    if (user) {
      filterObj['user'] = user;
    }
    if (searchText !== '') {
      filterObj['title'] = { $regex: searchText, $options: 'i' };
    }

    if (location !== '') {
      filterObj['location'] = { $regex: location, $options: 'i' };
    }
    const jobs = await Job.find(filterObj).populate('user');
    return NextResponse.json({
      message: 'Job fetched successfully!',
      data: jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
