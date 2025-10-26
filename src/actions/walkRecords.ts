'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 散歩記録の型定義
export interface WalkRecord {
  id?: string
  created_at?: string
  duration_minutes: number
  course_name: string
}

// 散歩記録を作成
export async function createWalkRecord(formData: FormData) {
  const walkRecord: Omit<WalkRecord, 'id' | 'created_at'> = {
    duration_minutes: Number(formData.get('duration_minutes')),
    course_name: formData.get('course') as string,
  }

  try {
    const { data, error } = await supabase
      .from('dogwalk_table')
      .insert([walkRecord])
      .select()
      .single()

    if (error) {
      throw new Error(`散歩記録の作成に失敗しました: ${error.message}`)
    }

    revalidatePath('/')
    redirect('/')
  } catch (error) {
    console.error('散歩記録の作成エラー:', error)
    // エラーが発生した場合は、エラーページにリダイレクトするか、
    // エラー状態を管理する必要があります
    throw new Error(error instanceof Error ? error.message : '不明なエラーが発生しました')
  }
}

// 散歩記録を取得
export async function getWalkRecords() {
  try {
    const { data, error } = await supabase
      .from('dogwalk_table')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`散歩記録の取得に失敗しました: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    }
  }
}

// 散歩記録を更新
export async function updateWalkRecord(id: string, formData: FormData) {
  const updates: Partial<WalkRecord> = {
    duration_minutes: Number(formData.get('duration_minutes')),
    course_name: formData.get('course') as string,
  }

  try {
    const { data, error } = await supabase
      .from('dogwalk_table')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`散歩記録の更新に失敗しました: ${error.message}`)
    }

    revalidatePath('/')
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    }
  }
}

// 散歩記録を削除
export async function deleteWalkRecord(id: string) {
  try {
    const { error } = await supabase
      .from('dogwalk_table')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`散歩記録の削除に失敗しました: ${error.message}`)
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    }
  }
}

// 特定の散歩記録を取得
export async function getWalkRecordsByDog(dogName: string) {
  try {
    const { data, error } = await supabase
      .from('dogwalk_table')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`散歩記録の取得に失敗しました: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '不明なエラーが発生しました' 
    }
  }
}
