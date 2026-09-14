// Supabase project behind the admin (clients + projects).
// These are the *publishable* values — safe to ship to the browser. Row-level security in
// Supabase decides who can read or change what; the admin password never lives in this repo.
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const SUPABASE_READY = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
