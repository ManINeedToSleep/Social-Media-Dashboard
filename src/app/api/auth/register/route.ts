import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';

// Schema for validating registration data
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Return sanitized user object (without password)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 