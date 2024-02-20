import database from '@/app/database'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    const url_parts = request.url.split('/')
    const product_name = url_parts[url_parts.length - 1]
    await database.from('products')
        .delete()
        .eq('name', product_name)
    return NextResponse.json({})
}