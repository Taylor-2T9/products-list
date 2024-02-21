import database from '@/app/database'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const data = await database.from('products')
        .select()
        .then(({ data: rows }) => rows?.map(
            item => ({ Nome: item.name, Quantidade: item.amount })
        ))
    return NextResponse.json(data)
}
export async function POST(request: Request) {
    const body = await request.json()
    const data = await database.from('products')
        .insert(body)

    return NextResponse.json({ data })
}
