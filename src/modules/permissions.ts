// src/modules/permissions.ts
import api from '@/plugins/api'

export interface Permission {
    id: string
    name: string
    created_at: string
    updated_at: string
}

interface PermissionsResponse {
    success: boolean
    message: string
    data: Permission[]
    meta: {
        pagination: {
            total: number
            count: number
            per_page: number
            current_page: number
            total_pages: number
            links: Record<string, string>
        }
    }
}

export const permissionsModule = {
    getAllPermissions() {
        return api.get<PermissionsResponse>('/permissions/all')
    },

    getPermissions(page: number = 1, search: string = '') {
        return api.get<PermissionsResponse>(`/permissions?page=${page}&search=${search}`)
    },

    getPermission(id: string) {
        return api.get<{success: boolean, data: Permission}>(`/permissions/${id}`)
    },

    createPermission(permissionData: Partial<Permission>) {
        return api.post<{success: boolean, data: Permission}>('/permissions', permissionData)
    },

    updatePermission(id: string, permissionData: Partial<Permission>) {
        return api.put<{success: boolean, data: Permission}>(`/permissions/${id}`, permissionData)
    },
}