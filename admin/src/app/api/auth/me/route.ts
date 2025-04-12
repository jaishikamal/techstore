import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { UserModel } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken');

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token.value, JWT_SECRET) as {
        id: string;
        email: string;
        role: string;
        name: string;
      };

      // Fetch user from database
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 401 }
        );
      }

      // Check if user is active
      if (user.status !== 'active') {
        return NextResponse.json(
          { message: 'Account is inactive' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 