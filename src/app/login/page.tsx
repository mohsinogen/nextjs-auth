"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {

    const router = useRouter()

    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            setLoading(true)

            const response = await axios.post("/api/users/login", user);

            console.log("login success", response);

            toast.success("login success")
            router.push("/profile")
            
        } catch (error:any) {
            console.log("login error", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(
            user.email.length> 0 &&
            user.password.length > 0
        ){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Please wait":"Login"}</h1>
            <hr />
           

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

            <button disabled={buttonDisabled}
            onClick={onLogin}
                className="p-2 border border-gray-300
                rounded-lg mb-4 focus:outline-none
                focus:border-gray-600">
                Login here
            </button>
            <Link href={"/signup"}>Visit Signup</Link>
        </div>
    );
}