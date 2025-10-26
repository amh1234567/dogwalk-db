'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 散歩記録の型定義
export interface WalkRecord {
  id?: string
  dog_name?: string
  walk_date: string
  duration_minutes: number
  course: string
  distance_km?: number
  notes?: string
  weather?: string
  created_at?: string
  updated_at?: string
}

// 散歩記録を作成
export async function createWalkRecord(formData: FormData) {
  const walkRecord: Omit<WalkRecord, 'id' | 'created_at' | 'updated_at'> = {
    dog_name: formData.get('dog_name') as string || undefined,
    walk_date: formData.get('walk_date') as string,
    duration_minutes: Number(formData.get('duration_minutes')),
    course: formData.get('course') as string,
    distance_km: formData.get('distance_km') ? Number(formData.get('distance_km')) : undefined,
    notes: formData.get('notes') as string || undefined,
    weather: formData.get('weather') as string || undefined,
  }

  try {
    const { data, error } = await supabase
      .from('walk_records')
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
      .from('walk_records')
      .select('*')
      .order('walk_date', { ascending: false })

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
    dog_name: formData.get('dog_name') as string || undefined,
    walk_date: formData.get('walk_date') as string,
    duration_minutes: Number(formData.get('duration_minutes')),
    course: formData.get('course') as string,
    distance_km: formData.get('distance_km') ? Number(formData.get('distance_km')) : undefined,
    notes: formData.get('notes') as string || undefined,
    weather: formData.get('weather') as string || undefined,
  }

  try {
    const { data, error } = await supabase
      .from('walk_records')
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
      .from('walk_records')
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

// 特定の犬の散歩記録を取得
export async function getWalkRecordsByDog(dogName: string) {
  try {
    const { data, error } = await supabase
      .from('walk_records')
      .select('*')
      .eq('dog_name', dogName)
      .order('walk_date', { ascending: false })

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
