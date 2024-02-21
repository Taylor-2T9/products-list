import database from '@/app/database'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    const url_parts = request.url.split('/')
    const product_name = decodeURIComponent(url_parts[url_parts.length - 1])

    await database.from('products')
        .delete()
        .eq('name', product_name)

    return NextResponse.json({})
}
export async function PATCH(request: Request) {
    const body = await request.json()

    const url_parts = request.url.split('/')
    const product_name = decodeURIComponent(url_parts[url_parts.length - 1])

    await database.from('products')
        .update({ name: body.newName, amount: Number(body.amount) })
        .eq('name', product_name)

    return NextResponse.json({})
}