import api from '@/plugins/api'
import { type User } from './users'

export interface LoginResponse {
    success: boolean
    message: string
    data: {
        token: string
        user: User
    }
}

interface LoginCredentials {
    email: string
    password: string
}

export const authModule = {
    login(credentials: LoginCredentials) {
        return api.post<LoginResponse>('/auth/login', credentials)
    },

    logout() {
        return api.post('/auth/logout')
    },

    checkAuth() {
        return api.get<{success: boolean, data: { user: User }}>('/auth/check')
    },
}