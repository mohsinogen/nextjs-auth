import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({
        error: "User already exist",
        status: 400,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const userCreated = await newUser.save();

    console.log(userCreated);

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      savedUser: userCreated,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
