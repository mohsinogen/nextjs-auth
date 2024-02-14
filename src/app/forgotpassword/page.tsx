"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function ForgotpasswordPage() {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const [email, setEmail] = React.useState("");

    const onResetPassword = async () => {
        if(email === ""){
            toast.error("Please enter your Email", {position:'bottom-center'})
            return;
        }
        try {
            setLoading(true);

            const response = await axios.post("/api/users/forgotpassword", {email});

            if(response.data.success){
                toast.success("Password reset link has been sent on your Email",{position:"bottom-center"});
                setTimeout(()=>{
                    router.replace("/")
                }, 3000)
            }else{
                toast.error("Something went wrong",{position:"bottom-center"});
            }

        } catch (error: any) {
                console.log(error);
                
                toast.error(error.response?.data ? error.response?.data.error: error.message,{position:"bottom-center"});
            
        } finally {
            setLoading(false);
        }
    };

    const onChangePassword = () =>{

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                   <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            required={true}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <button
                            disabled={loading}
                            onClick={onResetPassword}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Confirm Email
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}