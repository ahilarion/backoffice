import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        async login(email: string, password: string) {
            this.isAuthenticated = true
            localStorage.setItem('auth_token', '123456')
        },
        async logout() {
            this.isAuthenticated = false
            localStorage.removeItem('auth_token')
        },
        checkAuth() {
            const token = localStorage.getItem('auth_token')
            if (token) {
                this.isAuthenticated = true
            }
        }
    }
})