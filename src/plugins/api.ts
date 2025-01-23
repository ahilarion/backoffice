import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const logMethodStatus = (method: string, url: string, success = true) => {
    const toastOptions = {
        position: toast.POSITION.BOTTOM_RIGHT,
    }

    if (success) {
        switch (method) {
            case 'GET':
                break
            default:
                toast.success(`${method} Réussi`, toastOptions)
        }
    } else {
        toast.error(`${method} Échoué`, toastOptions)
    }
}

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
    (response) => {
        logMethodStatus(response.config.method?.toUpperCase() || '', response.config.url || '', true)
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            toast.error('Session expirée, veuillez vous reconnecter', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }

        logMethodStatus(
            error.config.method.toUpperCase(),
            error.config.url,
            false
        )

        return Promise.reject(error)
    }
)

export default api