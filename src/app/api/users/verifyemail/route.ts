import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models"
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();

        const {token} = reqBody;

        console.log("token",token);
        
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                error:"User not found",
                status: 404,
            })
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({
            message: 'email verified',
            success: true
        })
        

    } catch (error:any) {
        return NextResponse.json(
           { error:error.message,
            status: 500}
        )
    }
}