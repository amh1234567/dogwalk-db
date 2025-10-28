import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 型安全なクライアント（必要に応じて型定義を追加）
export type Database = {
  // ここにデータベースの型定義を追加
}

export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey)
