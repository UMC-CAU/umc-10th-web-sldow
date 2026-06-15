// API 클라이언트 설정
// 실제 백엔드 API와 통신하기 위한 기본 설정을 담고 있습니다.

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_TOKEN = import.meta.env.VITE_TOKEN

export const apiClient = {
  async request(url, options = {}) {
    const finalUrl = `${API_BASE_URL}${url}`

    const headers = {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }

    if (API_TOKEN && API_BASE_URL.includes('themoviedb.org')) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(finalUrl, {
      headers,
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  get(url) {
    return this.request(url, { method: 'GET' })
  },

  post(url, data) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  put(url, data) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },

  delete(url) {
    return this.request(url, { method: 'DELETE' })
  },
}
