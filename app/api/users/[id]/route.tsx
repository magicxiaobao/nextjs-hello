import {NextRequest, NextResponse} from "next/server";
import schema from '../schema'
import prisma from '@/prisma/client'


export async function GET(request: NextRequest,
                    {params}: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: {id: Number(params.id)}
    });

    if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }
    return NextResponse.json(user)
}

export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const userExist = await prisma.user.findUnique({where: {id: parseInt(params.id)}});
    if (!userExist) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }
    const userUpdated = await prisma.user.update({
        where: {id: userExist.id},
        data: {
            name: body.name,
            email: body.email
        }
    });
    return NextResponse.json(userUpdated, {status: 200})
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {

    const user = await prisma.user.findUnique({where: {id: parseInt(params.id)}});
    if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }
    await prisma.user.delete({where: {id: user.id}})
    return NextResponse.json({})
}
