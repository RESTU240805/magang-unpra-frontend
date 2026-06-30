import axios from 'axios'

let BASE_URL = import.meta.env.VITE_API_URL
if (!BASE_URL) {
  if (import.meta.env.DEV) {
    BASE_URL = 'http://localhost:8080/api'
  } else {
    console.error('VITE_API_URL wajib diatur untuk production! Buat .env.production')
  }
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default api