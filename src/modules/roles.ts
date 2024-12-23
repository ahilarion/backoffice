// src/modules/users.ts
import api from '@/plugins/api'

export interface Role {
    id: string
    name: string
    created_at: string
    updated_at: string
}

interface RolesResponse {
    success: boolean
    message: string
    data: Role[]
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

export const rolesModule = {
    getRoles(page: number = 1) {
        return api.get<RolesResponse>(`/roles?page=${page}`)
    },

    getRole(id: string) {
        return api.get<{success: boolean, data: Role}>(`/roles/${id}`)
    },

    createRole(roleData: Partial<Role>) {
        return api.post<{success: boolean, data: Role}>('/roles', roleData)
    }
}