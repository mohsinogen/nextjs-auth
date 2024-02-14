import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email } = reqBody;


    const user = await User.findOne({
      email
    });

    if (!user) {
      return NextResponse.json({ error: "User not found with given email" }, { status: 404 });
    }

    await sendEmail({
      email,
      emailType:"RESET",
      userId: user._id
     })

    return NextResponse.json({
      message: "Password reset link sent",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* 
export async function PUT(request: NextRequest){

  try {
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

} */