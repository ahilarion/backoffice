import { defineStore } from 'pinia'
import { usersModule, type User } from '@/modules/users'

interface UsersState {
    users: User[]
    user: User | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useUsersStore = defineStore('users', {
    state: (): UsersState => ({
        users: [],
        user: null,
        loading: false,
        error: null,
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            perPage: 12
        }
    }),

    actions: {
        async fetchUsers(page: number = 1) {
            try {
                this.loading = true
                const response = await usersModule.getUsers(page)
                this.users = response.data.data

                const { pagination } = response.data.meta
                this.pagination = {
                    total: pagination.total,
                    currentPage: pagination.current_page,
                    totalPages: pagination.total_pages,
                    perPage: pagination.per_page
                }
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchUser(id: string) {
            try {
                this.loading = true
                const response = await usersModule.getUser(id)
                this.user = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async createUser(userData: Partial<User>) {
            try {
                this.loading = true
                const response = await usersModule.createUser(userData)
                this.users.push(response.data.data)
                return response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateUser(id: string, userData: Partial<User>) {
            try {
                this.loading = true
                const response = await usersModule.updateUser(id, userData)
                const index = this.users.findIndex(user => user.id === id)
                if (index !== -1) {
                    this.users[index] = response.data.data
                }
                return response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateProfilePicture(id: string, profilePicture: File) {
            try {
                this.loading = true
                const response = await usersModule.updateProfilePicture(id, profilePicture)
                this.user = response.data.data
                return response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async changePassword(id: string, currentPassword: string, password: string, passwordConfirmation: string) {
            try {
                this.loading = true
                await usersModule.changePassword(id, currentPassword, password, passwordConfirmation)
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id: string) {
            try {
                this.loading = true
                await usersModule.deleteUser(id)
                this.users = this.users.filter(user => user.id !== id)
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})