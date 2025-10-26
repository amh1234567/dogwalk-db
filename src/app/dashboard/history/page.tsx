import { getWalkRecords } from '@/actions/walkRecords'
import Link from 'next/link'

export default async function HistoryPage() {
  const result = await getWalkRecords()

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">エラーが発生しました</h2>
            <p className="text-red-600 mt-2">{result.error}</p>
          </div>
        </div>
      </div>
    )
  }

  const walkRecords = result.data || []

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">散歩履歴</h1>
              <p className="text-gray-600 mt-2">過去の散歩記録を確認できます</p>
            </div>
            <Link
              href="/dashboard/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              新しい記録を追加
            </Link>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">総散歩回数</h3>
            <p className="text-2xl font-bold text-gray-900">{walkRecords.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">総散歩時間</h3>
            <p className="text-2xl font-bold text-gray-900">
              {walkRecords.reduce((total, record) => total + record.duration_minutes, 0)}分
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">総距離</h3>
            <p className="text-2xl font-bold text-gray-900">
              {walkRecords.reduce((total, record) => total + (record.distance_km || 0), 0).toFixed(1)}km
            </p>
          </div>
        </div>

        {/* 散歩記録一覧 */}
        <div className="bg-white rounded-lg shadow">
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                記録を追加
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
                          {record.dog_name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(record.walk_date).toLocaleDateString('ja-JP')}
                        </span>
                        {record.weather && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {record.weather}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                        <span>時間: {record.duration_minutes}分</span>
                        {record.distance_km && (
                          <span>距離: {record.distance_km}km</span>
                        )}
                      </div>
                      {record.notes && (
                        <p className="mt-2 text-sm text-gray-600">{record.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        編集
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        削除
                      </button>
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
