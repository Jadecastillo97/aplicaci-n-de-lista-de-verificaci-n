/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: process.env.NEXT_APP_NAME,
    APP_ID: process.env.NEXT_APP_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

export default nextConfig
