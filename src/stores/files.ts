import { defineStore } from 'pinia'
import { filesModule, type File } from '@/modules/files'

interface FilesState {
    files: File[]
    file: File | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useFilesStore = defineStore('files', {
    state: (): FilesState => ({
        files: [],
        file: null,
        loading: false,
        error: null,
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            perPage: 18
        }
    }),

    actions: {
        async fetchFiles(page: number = 1) {
            try {
                this.loading = true
                const response = await filesModule.getFiles(page)

                this.files = response.data.data

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

        async uploadFile(file : globalThis.File) {
            try {
                this.loading = true
                await filesModule.uploadFile(file)
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async replaceFile(id: string, file : globalThis.File) {
            try {
                this.loading = true
                await filesModule.replaceFile(id, file)
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteFile(id: string) {
            try {
                this.loading = true
                await filesModule.deleteFile(id)
            } catch (error: any) {
                this.error = error.response?.data?.message
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})