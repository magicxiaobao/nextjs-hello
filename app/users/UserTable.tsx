import React from 'react'
import {sort} from 'fast-sort'
import Link from "next/link";

export interface User {
    id: number,
    name: string,
    email: string
}

interface UserTableProps {
    sortOrder?: string
}

const UserTable = async ({sortOrder}: UserTableProps) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",
        {cache: 'no-store'});
    const users: User[] = await response.json();
    const usersSorted = sort(users).asc('email' === sortOrder ? user => user.email : user => user.name);
    return (
        <div>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th><Link href="/users?sortOrder=name">Name</Link></th>
                    <th><Link href="/users?sortOrder=email">Email</Link></th>
                </tr>
                </thead>
                <tbody>
                {usersSorted.map(user => <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default UserTable
