import {PrismaAdapter} from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHub from "next-auth/providers/github";
import prisma from "@/prisma/client";

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
