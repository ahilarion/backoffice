import { defineStore } from 'pinia'
import { slidesModule, type Slide } from '@/modules/slides'

interface ArticlesState {
    slides: Slide[]
    slide: Slide | null
    loading: boolean
    error: string | null
}

export const useSlidesStore = defineStore('slides', {
    state: (): ArticlesState => ({
        slides: [],
        slide: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchSlides() {
            try {
                this.loading = true
                const response = await slidesModule.getSlides()
                this.slides = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchSlide(id: string) {
            try {
                this.loading = true
                const response = await slidesModule.getSlide(id)
                this.slide = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createSlide(slideData: Partial<Slide>) {
            try {
                this.loading = true
                const response = await slidesModule.createSlide(slideData)
                this.slides.push(response.data.data)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateSlide(id: string, slideData: Partial<Slide>) {
            try {
                this.loading = true
                const response = await slidesModule.updateSlide(id, slideData)
                const index = this.slides.findIndex(slide => slide.id === id)
                this.slides[index] = response.data.data
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteSlide(id: string) {
            try {
                this.loading = true
                await slidesModule.deleteSlide(id)
                this.slides = this.slides.filter(slide => slide.id !== id)
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})