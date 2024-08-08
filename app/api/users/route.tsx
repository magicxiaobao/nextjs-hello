import {NextRequest, NextResponse} from "next/server";
import schema from './schema'
import prisma from '@/prisma/client'

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const isEmailExist = await prisma.user.findUnique({where: {email: body.email}});
    if (isEmailExist) {
        return NextResponse.json({error: 'email already exists'}, {status: 400});
    }
    const userCreated = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email
        }
    });
    return NextResponse.json(userCreated, {status: 201});
}
