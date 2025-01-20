// src/modules/files.ts
import api from '@/plugins/api'

export interface File {
    id: string
    name: string
    url: string
    is_public: boolean
    extension: string
    size: number
    created_at: string
    updated_at: string
}

interface FilesResponse {
    success: boolean
    message: string
    data: File[]
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

export const filesModule = {
    getFiles(page: number = 1) {
        return api.get<FilesResponse>(`/files?page=${page}`)
    },

    uploadFile(file : globalThis.File) {
        const formData = new FormData();
        formData.append('file', file);

        return api.post(`/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },


    deleteFile(id: string) {
        return api.delete<{success: boolean}>(`/files/${id}`)
    }
}