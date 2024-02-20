/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_API: process.env.BASE_API,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
}

module.exports = nextConfig
