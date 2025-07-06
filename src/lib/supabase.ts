import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface x {
  id: string
  title: string
  slug: string | null
  content: string | null
  created_at: string
  updated_at: string | null
}

export interface DatabaseCategory {
  id: number
  name: string
}

export interface DatabasePostCategory {
  post_id: string | null
  category_id: number | null
}