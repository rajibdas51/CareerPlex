import Job from '@/models/jobModel';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/config/dbConfig';
import { validateJWT } from '@/helpers/validateJWT';
import { revalidatePath } from 'next/cache';
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
    revalidatePath('/');
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  await connectDb();
  try {
    // Fetch query string parameters
    const searchParams = new URL(request.url).searchParams;
    const user = searchParams.get('user');
    const searchText = searchParams.get('searchText') || '';
    const location = searchParams.get('location') || '';

    // Build the filter object based on query parameters
    const filterObj: any = {};
    if (user) {
      filterObj['user'] = user; // Fetch jobs created by a specific user
    }
    if (searchText) {
      filterObj['title'] = { $regex: String(searchText), $options: 'i' }; // Filter by job title
    }
    if (location) {
      filterObj['location'] = { $regex: String(location), $options: 'i' }; // Filter by location
    }

    // Fetch jobs from the database and always populate the user field
    const jobs = await Job.find(filterObj).populate({
      path: 'user',
      model: User,
    }); // Exclude sensitive fields like password

    return NextResponse.json({
      message: 'Jobs fetched successfully!',
      data: jobs,
    });
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error fetching jobs:', error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
