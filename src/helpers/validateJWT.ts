import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const validateJWT = async (request: NextRequest): Promise<string | null> => {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return null; // No token; user is unauthenticated
    }

    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedData.userId; // Return user ID for authenticated users
  } catch (error: any) {
    console.error('JWT Validation Error:', error.message);
    return null; // Invalid token; treat as unauthenticated
  }
};
