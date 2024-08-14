"use client"
import React from 'react'
import Link from "next/link";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const {status, data: session} = useSession();
    return (
        <div className='flex bg-slate-500 p-5 space-x-3'>
            <Link href='/'>NextJs</Link>
            <Link href='/users'>Users</Link>
            <Link href='/products'>Products</Link>
            {status === 'unauthenticated' && <Link href='/api/auth/signin'>SignIn</Link>}
            {status === 'authenticated' &&
                <div>
                    {session.user!.name}
                    <Link href='/api/auth/signout' className='ml-3'>SignOut</Link>
                </div>
            }
        </div>
    )
}
export default NavBar
