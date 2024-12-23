import { defineStore } from 'pinia'
import { articlesModule, type Article } from '@/modules/articles'

interface ArticlesState {
    articles: Article[]
    article: Article | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useArticlesStore = defineStore('articles', {
    state: (): ArticlesState => ({
        articles: [],
        article: null,
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
        async fetchArticles(page: number = 1) {
            try {
                this.loading = true
                const response = await articlesModule.getArticles(page)
                this.articles = response.data.data

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

        async fetchArticle(id: string) {
            try {
                this.loading = true
                const response = await articlesModule.getArticle(id)
                this.article = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createArticle(roleData: Partial<Article>) {
            try {
                this.loading = true
                const response = await articlesModule.createArticle(roleData)
                this.articles.push(response.data.data)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateArticle(id: string, articleData: Partial<Article>) {
            try {
                this.loading = true
                const response = await articlesModule.updateArticle(id, articleData)
                this.articles = this.articles.map((article) => article.id === id ? response.data.data : article)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteArticle(id: string) {
            try {
                this.loading = true
                await articlesModule.deleteArticle(id)
                this.articles = this.articles.filter((article) => article.id !== id)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})