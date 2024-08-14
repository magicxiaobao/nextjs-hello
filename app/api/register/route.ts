import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const schema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20)
})

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }
    const user = await prisma.user.findUnique({
        where: {
            username: validation.data.username
        }
    });
    if (user) {
        return NextResponse.json({error: "User already exists"}, {status: 400})
    }
    const pwdHashed = await bcrypt.hash(validation.data.password, 10);
    const newUser = await prisma.user.create({
        data: {
            username: validation.data.username,
            hashedPassword: pwdHashed
        }
    });
    return NextResponse.json({username: newUser.username}, {status: 201})
}
