'use client'
import React from 'react'
import {useRouter} from "next/navigation";

const NewUserPage = () => {
    const router = useRouter();
    return (
        <>
        <div>NewUserPage</div>
        <button className='btn-primary' onClick={() => router.push("/users")}>Back</button>
        </>
    )
}
export default NewUserPage
