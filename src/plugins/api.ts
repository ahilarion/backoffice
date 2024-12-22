import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    const utmSource = import.meta.env.VITE_UTM_SOURCE
    if (utmSource) {
        config.params = {
            ...config.params,
            utm_source: utmSource
        }
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
        }
        return Promise.reject(error)
    }
)

export default api