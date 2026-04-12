// ─────────────────────────────────────────────────────────────────────────────
// SUPABASE SETUP — 100% Free, no credit card needed
//
// 1. Go to https://supabase.com and click "Start your project" (free)
// 2. Sign in with GitHub
// 3. Click "New project" → name it "letmecheck" → set a DB password → Create
// 4. Wait ~2 minutes for the project to be ready
// 5. Go to Project Settings → API
//    Copy "Project URL" and "anon public" key and paste below
// 6. Go to SQL Editor → New query → paste and run this SQL:
//
//    create table if not exists public.users (
//      id uuid references auth.users on delete cascade primary key,
//      profile jsonb default '{}'::jsonb,
//      analysis_result jsonb,
//      enrolled_courses jsonb default '[]'::jsonb,
//      course_progress jsonb default '{}'::jsonb,
//      created_at timestamptz default now()
//    );
//    alter table public.users enable row level security;
//    create policy "Users can manage own data" on public.users
//      for all using (auth.uid() = id);
//
// 7. Go to Authentication → Providers → Email → make sure it's enabled
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

// ⬇️ PASTE YOUR SUPABASE PROJECT URL AND ANON KEY HERE
const SUPABASE_URL = 'https://tbxbyiycevjkipybhowy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieGJ5aXljZXZqa2lweWJob3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDMyMjQsImV4cCI6MjA5MTU3OTIyNH0.I_45JPBIfFRQvUTxjIrs_hWFkA3Q08BZfwupFjqozLQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
