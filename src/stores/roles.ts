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

                this.error = null
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

                this.error = null
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

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateRole(roleId: string, roleData: Partial<Role>) {
            try {
                this.loading = true
                const response = await rolesModule.updateRole(roleId, roleData)
                const index = this.roles.findIndex(role => role.id === response.data.data.id)
                this.roles[index] = response.data.data

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteRole(roleId: string) {
            try {
                this.loading = true
                await rolesModule.deleteRole(roleId)
                this.roles = this.roles.filter(role => role.id !== roleId)

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})