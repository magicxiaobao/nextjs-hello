import {NextRequest, NextResponse} from "next/server";
import schema from '../schema'


export async function PUT(request: NextRequest, {params: {id}}: {params: {id: number}}) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({error: validation.error.errors}, {status: 400});
    }
    if (id > 10) {
        return NextResponse.json({error: "Product not found"}, {status: 404});
    }
    return NextResponse.json({id, name: body.name, price: body.price}, {status: 200})
}

export function DELETE(request: NextRequest, {params: {id}}: {params: {id: number}}) {
    if (id > 10) {
        return NextResponse.json({error: "Product not found"}, {status: 404});
    }
    return NextResponse.json({})
}
