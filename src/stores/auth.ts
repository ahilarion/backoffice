import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false
    }),
    actions: {
        login(email: string, password: string) {
            this.isAuthenticated = true
            localStorage.setItem('auth_token', '123456')
        },
        logout() {
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