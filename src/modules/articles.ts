// src/modules/articles.ts
import api from '@/plugins/api'

export interface Article {
    id: string
    title: string
    slug: string
    short_description: string
    thumbnail: string
    content: string
    is_published: boolean
    created_at: string
    updated_at: string
}

interface ArticlesResponse {
    success: boolean
    message: string
    data: Article[]
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

export const articlesModule = {
    getArticles(page: number = 1) {
        return api.get<ArticlesResponse>(`/articles?page=${page}`)
    },

    getArticle(id: string) {
        return api.get<{success: boolean, data: Article}>(`/articles/${id}`)
    },

    createArticle(articleData: Partial<Article>) {
        return api.post<{success: boolean, data: Article}>('/articles', articleData)
    }
}