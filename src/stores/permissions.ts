import { defineStore } from 'pinia'
import { permissionsModule, type Permission } from '@/modules/permissions'

interface PermissionsState {
    permissions: Permission[]
    permission: Permission | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const usePermissionsStore = defineStore('permissions', {
    state: (): PermissionsState => ({
        permissions: [],
        permission: null,
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
        async fetchPermissions(page: number = 1) {
            try {
                this.loading = true
                const response = await permissionsModule.getPermissions(page)
                this.permissions = response.data.data

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

        async fetchPermission(id: string) {
            try {
                this.loading = true
                const response = await permissionsModule.getPermission(id)
                this.permission = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchAllPermissions() {
            try {
                this.loading = true
                const response = await permissionsModule.getAllPermissions()
                this.permissions = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createPermission(permissionData: Partial<Permission>) {
            try {
                this.loading = true
                const response = await permissionsModule.createPermission(permissionData)
                this.permissions.push(response.data.data)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updatePermission(permissionData: Partial<Permission>) {
            try {
                this.loading = true
                const response = await permissionsModule.updatePermission(<string>permissionData.id, permissionData)
                const index = this.permissions.findIndex(permission => permission.id === response.data.data.id)
                this.permissions[index] = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },
    }
})