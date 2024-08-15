import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import {authOptions} from "@/app/api/auth/authOptions";

const prisma = new PrismaClient();



const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}
