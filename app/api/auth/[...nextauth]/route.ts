import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials.password) {
                    return null
                }
                const userFound = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                });
                if (!userFound) {
                    return null
                }
                const passwordMatch = await bcrypt.compare(credentials.password, userFound.hashedPassword!);
                return passwordMatch ? userFound : null
            },
        }),
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ]
}

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}
