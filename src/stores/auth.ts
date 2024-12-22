import { defineStore } from 'pinia'
import { authModule } from '@/modules/auth'
import { usersModule } from "@/modules/users";

interface User {
    id: string
    first_name: string
    last_name: string
    email: string
    locale: string
    created_at: string
    updated_at: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null as User | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                this.loading = true
                this.error = null

                const response = await authModule.login({ email, password })
                const { token, user } = response.data.data

                localStorage.setItem('auth_token', token)
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