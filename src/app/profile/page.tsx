"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ProfilePage() {

    const router = useRouter();
    const logout = async () => {
        try {

            await axios.get("/api/users/logout")

            router.push('/login')
        } catch (error) {
            console.log("failed to logout", error);

        }
    }

    const [data, setData] = useState("");

    const getUserDetails = async ()=>{
        try {
            const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
        } catch (error:any) {
            console.log(error.message);
            
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[])

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2"
        >
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data==="" ? "No data to show":
            <Link href={`/profile/${data}`}>
                {data}</Link>}</h2>
            <hr />

            

            <button onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded">
                Logout
            </button>

            <button onClick={getUserDetails}
                className="bg-green-700 mt-4 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded">
                Get User details
            </button>
        </div>
    )
}