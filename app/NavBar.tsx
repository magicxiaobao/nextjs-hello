import React from 'react'
import Link from "next/link";

const NavBar = () => {
    return (
        <div className='flex bg-slate-500 p-5'>
            <Link href='/' className='mr-5'>NextJs</Link>
            <Link href='/users' className='mr-5'>Users</Link>
            <Link href='/products'>Products</Link>
        </div>
    )
}
export default NavBar
