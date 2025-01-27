// src/modules/faq.ts
import api from '@/plugins/api'

export interface FAQ {
    id: string
    question: string
    answer: string
    created_at: string
    updated_at: string
}

interface FAQResponse {
    success: boolean
    message: string
    data: FAQ[]
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

export const FAQModule = {
    getFAQ(page: number = 1) {
        return api.get<FAQResponse>(`/faq?page=${page}`)
    },

    getFAQItem(id: string) {
        return api.get<{success: boolean, data: FAQ}>(`/faq/${id}`)
    },

    createFAQ(faqData: Partial<FAQ>) {
        return api.post<{success: boolean, data: FAQ}>('/faq', faqData)
    },

    updateFAQ(id: string, faqData: Partial<FAQ>) {
        return api.put<{success: boolean, data: FAQ}>(`/faq/${id}`, faqData)
    },

    deleteFAQ(id: string) {
        return api.delete<{success: boolean}>(`/faq/${id}`)
    }
}