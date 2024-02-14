"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function ChangepasswordPage() {
    const router = useRouter();

    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const onChangePassword = async () => {
        if(password === "" && confirmPassword === ""){
            toast.error("Please enter and confirm password!", {position:'bottom-center'})
            return;
        }
        if(password !== confirmPassword) {
            toast.error("Please match confirm password!", {position:'bottom-center'})
            return;
        }
        if(password.length<6 || confirmPassword.length<6){
            toast.error("Password length should be 6!", {position:'bottom-center'})
            return;
        }
        
       try {
            setLoading(true);

            const response = await axios.post("/api/users/changepassword", {password, token});

            if(response.data.success){
                toast.success("Password updated please login",{position:"bottom-center"});
                setTimeout(()=>{
                    router.push('/login')
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
    
    
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if(urlToken){
            setToken(urlToken)
        } else {
            router.replace("/")
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                   <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <input
                            required={true}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            disabled={loading}
                        />
                    </div>
                   
                   <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="confirmpassword"
                        >
                            Confirm New Password
                        </label>
                        <input
                            required={true}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmpassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <button
                            disabled={loading}
                            onClick={onChangePassword}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                           Update Password
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}