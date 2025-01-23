// src/modules/users.ts
import api from '@/plugins/api'

export interface User {
    id: string
    first_name: string
    last_name: string
    profile_picture: string
    email: string
    locale: string
    role: string
    created_at: string
    updated_at: string
}

interface UsersResponse {
    success: boolean
    message: string
    data: User[]
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

export const usersModule = {
    getUsers(page: number = 1) {
        return api.get<UsersResponse>(`/users?page=${page}`)
    },

    getUser(id: string) {
        return api.get<{success: boolean, data: User}>(`/users/${id}`)
    },

    createUser(userData: Partial<User>) {
        return api.post<{success: boolean, data: User}>('/users', userData)
    },

    updateUser(id: string, userData: Partial<User> ) {
        return api.put<{success: boolean, data: User}>(`/users/${id}`, userData)
    },

    updateProfilePicture(id: string, profilePicture: File) {
        const formData = new FormData();
        formData.append('profile_picture', profilePicture);

        return api.post(`/users/${id}/upload-profile-picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    changePassword(id: string, currentPassword: string, password: string, passwordConfirmation: string) {
        return api.put<{success: boolean}>(`/users/${id}/change-password`, {
            current_password: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation
        })
    },

    requestPasswordReset(id: string) {
        return api.post<{success: boolean}>(`/users/${id}/request-password-reset`)
    },

    changeUserRole(id: string, role: string) {
        return api.put<{success: boolean}>(`/users/${id}/change-role`, { role })
    },

    deleteUser(id: string) {
        return api.delete<{success: boolean}>(`/users/${id}`)
    }
}