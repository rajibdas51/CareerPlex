import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      throw new Error('No token found!!');
    }
    // decode the token
    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET!);
    // delete the token if it is expired

    return decodedData.userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
