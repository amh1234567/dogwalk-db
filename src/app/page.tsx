import { getWalkRecords, deleteWalkRecord } from '@/actions/walkRecords'
import Link from 'next/link'

export default async function Home() {
  const result = await getWalkRecords()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">エラーが発生しました</h2>
            <p className="text-red-600 mt-2">{result.error}</p>
          </div>
        </div>
      </div>
    )
  }

  const walkRecords = result.data || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">散歩記録</h1>
              <p className="text-gray-600">散歩の記録を見てみましょう</p>
            </div>
            <Link
              href="/dashboard/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              ➕ 新しい記録を追加
            </Link>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">総散歩回数</h3>
            <p className="text-3xl font-bold text-blue-600">{walkRecords.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">総散歩時間</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {walkRecords.reduce((total, record) => total + record.duration_minutes, 0)}分
            </p>
          </div>
        </div>

        {/* 散歩記録一覧 */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">散歩記録一覧</h2>
          </div>
          
          {walkRecords.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">散歩記録がありません</h3>
              <p className="text-gray-500 mb-4">最初の散歩記録を作成してみましょう</p>
              <Link
                href="/dashboard/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
              >
                ➕ 記録を追加
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {walkRecords.map((record) => (
                <div key={record.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          散歩記録
                        </h3>
                        {record.created_at && (
                          <span className="text-sm text-gray-500">
                            {new Date(record.created_at).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                        <span>⏱️ 時間: {record.duration_minutes}分</span>
                      </div>
                      {record.course_name && (
                        <p className="mt-2 text-sm text-gray-700 font-medium">
                          🗺️ {record.course_name}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <form action={async () => {
                        'use server'
                        await deleteWalkRecord(record.id!)
                      }}>
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          削除
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
