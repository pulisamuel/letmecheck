import { createClient } from '@supabase/supabase-js'

// These are read from environment variables at build time.
// In development: create a .env file in the project root (see .env.example).
// In Vercel: add these in Project Settings → Environment Variables.
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || 'https://tbxbyiycevjkipybhowy.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieGJ5aXljZXZqa2lweWJob3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDMyMjQsImV4cCI6MjA5MTU3OTIyNH0.I_45JPBIfFRQvUTxjIrs_hWFkA3Q08BZfwupFjqozLQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
