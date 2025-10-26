import { createWalkRecord } from '@/actions/walkRecords'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">散歩記録</h1>
          <p className="text-gray-600">散歩の時間とコースを記録しましょう</p>
        </div>

        {/* 履歴リンク */}
        <div className="mb-6 text-center">
          <Link
            href="/dashboard/history"
            className="text-gray-600 hover:text-gray-800 transition-colors underline"
          >
            履歴を見る →
          </Link>
        </div>

        {/* フォーム */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form action={createWalkRecord} className="space-y-6">
            {/* 散歩時間 */}
            <div>
              <label htmlFor="duration_minutes" className="block text-sm font-semibold text-gray-700 mb-2">
                散歩時間（分） <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="duration_minutes"
                name="duration_minutes"
                required
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="例: 30"
              />
            </div>

            {/* 散歩コース */}
            <div>
              <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                散歩コース <span className="text-red-500">*</span>
              </label>
              <textarea
                id="course"
                name="course"
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
                placeholder="例: 公園を1周 → 川沿いを歩く"
              />
            </div>

            {/* 送信ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                記録を保存
              </button>
            </div>
          </form>
        </div>

        {/* ヒント */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 ヒント</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 散歩時間は実際に歩いた時間を記録しましょう</li>
            <li>• コースには具体的なルートを記入すると後で振り返りやすくなります</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
