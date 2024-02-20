import database from '@/app/database'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const db_response = await database.from('products')
        .select()
    return NextResponse.json(db_response.data)
}
export async function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    const data = await database.from('products')
        .insert(body)

    return NextResponse.json({ data })
}