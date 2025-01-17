import { defineStore } from 'pinia'
import { authModule } from '@/modules/auth'
import { usersModule, type User } from '@/modules/users'

interface UsersState {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): UsersState => ({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                this.loading = true
                this.error = null

                const response = await authModule.login({ email, password })
                const { token, user } = response.data.data

                this.isAuthenticated = true
                this.user = user

                return response
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                this.loading = true
                await authModule.logout()
            } finally {
                this.isAuthenticated = false
                this.user = null
                localStorage.removeItem('auth_token')
                this.loading = false
            }
        },

        async checkAuth() {
            try {
                const token = localStorage.getItem('auth_token')
                if (!token) {
                    this.isAuthenticated = false
                    return
                }

                const response = await authModule.checkAuth()
                this.isAuthenticated = true
                this.user = response.data.data.user
            } catch (error) {
                this.isAuthenticated = false
                localStorage.removeItem('auth_token')
            }
        },

        async me() {
            try {
                this.loading = true
                const response = await usersModule.getUser(this.user?.id as string)
                this.user = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})