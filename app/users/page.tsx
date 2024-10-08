import React, {Suspense} from 'react'
import UserTable from "@/app/users/UserTable";
import Link from "next/link";

interface Props {
    searchParams: {
        sortOrder: string
    }
}

const UsersPage = ({searchParams: {sortOrder}}: Props) => {
    return (
        <>
            <h1>UsersPage</h1>
            <Link href='/users/new' className='btn'>New User</Link>
            <UserTable sortOrder={sortOrder}/>
        </>
    )
}
export default UsersPage
