import { defineStore } from 'pinia'
import { FAQModule, type FAQ } from '@/modules/faq'

interface FAQState {
    faq: FAQ[]
    faqItem: FAQ | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useFAQStore = defineStore('faq', {
    state: (): FAQState => ({
        faq: [],
        faqItem: null,
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
        async fetchFAQ(page: number = 1) {
            try {
                this.loading = true
                const response = await FAQModule.getFAQ(page)
                this.faq = response.data.data

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

        async fetchFAQItem(id: string) {
            try {
                this.loading = true
                const response = await FAQModule.getFAQItem(id)
                this.faqItem = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createFAQ(FAQData: Partial<FAQ>) {
            try {
                this.loading = true
                await FAQModule.createFAQ(FAQData)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateFAQ(id: string, FAQData: Partial<FAQ>) {
            try {
                this.loading = true
                await FAQModule.updateFAQ(id, FAQData)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteFAQ(id: string) {
            try {
                this.loading = true
                await FAQModule.deleteFAQ(id)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})