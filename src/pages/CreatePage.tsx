import { useNavigate } from 'react-router-dom';

export function CreatePage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen bg-black">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-neutral-400 hover:text-neutral-300 transition mb-4"
          >
            ← 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-white">새로운 항목 추가</h1>
          <p className="text-neutral-400 mt-2">새로운 음악 또는 영상을 추가해보세요.</p>
        </div>

        {/* 폼 */}
        <form className="bg-neutral-900 rounded-lg p-6 space-y-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              제목 *
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              설명
            </label>
            <textarea
              placeholder="설명을 입력하세요"
              rows={4}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* 썸네일 */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              썸네일 URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-pink-500 focus:outline-none transition"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-medium"
            >
              추가하기
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition font-medium"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
