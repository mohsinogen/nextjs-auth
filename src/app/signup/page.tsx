"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import  axios  from "axios";

export default function SignupPage() {

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {
        try {
            setLoading(true);

            const response = await axios.post("/api/users/signup",user)
            console.log("Signup success", response.data);
            
            router.push("/login")
            
        } catch (error:any) {
            console.log("client",error);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const [loading, setLoading] = React.useState(false)

    useEffect(()=>{
        if(
            user.email.length> 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Please wait":"Signup"}</h1>
            <hr />
            <label htmlFor="username">
                Username
            </label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
                className="text-black p-2 border border-gray-300 rounded-lg mb-4
            focus:outline-none focus:border-gray-600"
            />

            <label htmlFor="email">
                Email
            </label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
                className="text-black p-2 border border-gray-300 rounded-lg mb-4
            focus:outline-none focus:border-gray-600"
            />

            <label htmlFor="password">
                Password
            </label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
                className="text-black p-2 border border-gray-300 rounded-lg mb-4
            focus:outline-none focus:border-gray-600"
            />

            <button
            disabled={buttonDisabled}
            onClick={onSignup}
                className="p-2 border border-gray-300
                rounded-lg mb-4 focus:outline-none
                focus:border-gray-600">
                {buttonDisabled? 'No Signup' :'Signup here'}
            </button>
            <Link href={"/login"}>Visit Login</Link>
        </div>
    );
}