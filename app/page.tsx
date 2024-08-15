import Link from "next/link";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import {getServerSession} from "next-auth";

import Image from 'next/image'
import {authOptions} from "@/app/api/auth/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <main className="relative h-screen">
            <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
            <Link href={"/users"}>Users</Link>
            <ProductCard/>
            <Image src='https://bit.ly/react-cover'
                   fill className='object-cover'
                   sizes='(max-width: 4800px) 100vw, (max-width: 768px) 50vw, 33vw'
                   quality={100}
                   priority
                   alt='flower'/>
        </main>
    )
}
