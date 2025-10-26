import { createWalkRecord } from '@/actions/walkRecords'
import Link from 'next/link'

export default function NewWalkRecordPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/dashboard/history"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← 履歴に戻る
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">新しい散歩記録</h1>
          <p className="text-gray-600 mt-2">散歩の詳細を記録しましょう</p>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-lg shadow">
          <form action={createWalkRecord} className="p-6 space-y-6">
            {/* 散歩時間 */}
            <div>
              <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-2">
                散歩時間（分） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="duration_minutes"
                name="duration_minutes"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例: 30"
              />
            </div>

            {/* 散歩コース */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                散歩コース <span className="text-red-500">*</span>
              </label>
              <textarea
                id="course"
                name="course"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例: 公園を1周 → 川沿いを歩く"
              />
            </div>

            {/* ボタン */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                href="/dashboard/history"
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                キャンセル
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                記録を保存
              </button>
            </div>
          </form>
        </div>

        {/* ヒント */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">記録のヒント</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 散歩時間は実際の散歩時間を記録しましょう</li>
            <li>• コースには具体的なルートを記入すると後で振り返りやすくなります</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
