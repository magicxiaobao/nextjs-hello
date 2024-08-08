import {NextRequest, NextResponse} from "next/server";
import schema from '../schema'
import prisma from '@/prisma/client'


export async function PUT(request: NextRequest, {params: {id}}: {params: {id: string}}) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
    const productExist = await prisma.product.findUnique({where: {id: Number(id)}});
    if (!productExist) {
        return NextResponse.json({error: "Product not found"}, {status: 404});
    }
    const productUpdated = await prisma.product.update({
        where: {id: productExist.id},
        data: {name: body.name, price: body.price}
    });
    return NextResponse.json(productUpdated, {status: 200})
}

export async function DELETE(request: NextRequest, {params: {id}}: {params: {id: string}}) {
    const productExist = await prisma.product.findUnique({where: {id: parseInt(id)}});
    if (!productExist) {
        return NextResponse.json({error: "Product not found"}, {status: 404});
    }
    await prisma.product.delete({where: {id: productExist.id}});
    return NextResponse.json({})
}
