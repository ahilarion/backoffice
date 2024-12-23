import { defineStore } from 'pinia'
import { rolesModule, type Role } from '@/modules/roles'

interface RolesState {
    roles: Role[]
    role: Role | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useRolesStore = defineStore('roles', {
    state: (): RolesState => ({
        roles: [],
        role: null,
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
        async fetchRoles(page: number = 1) {
            try {
                this.loading = true
                const response = await rolesModule.getRoles(page)
                this.roles = response.data.data

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

        async fetchRole(id: string) {
            try {
                this.loading = true
                const response = await rolesModule.getRole(id)
                this.role = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createRole(roleData: Partial<Role>) {
            try {
                this.loading = true
                const response = await rolesModule.createRole(roleData)
                this.roles.push(response.data.data)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})