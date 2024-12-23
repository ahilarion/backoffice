// src/modules/slides.ts
import api from '@/plugins/api'

export interface Slide {
    id: string
    title: string
    text: string
    image_url: string
    redirect_url: string
    order: number
    created_at: string
    updated_at: string
}

interface SlidesResponse {
    success: boolean
    message: string
    data: Slide[]
}

export const slidesModule = {
    getSlides(page: number = 1) {
        return api.get<SlidesResponse>(`/slides`)
    },

    getSlide(id: string) {
        return api.get<{success: boolean, data: Slide}>(`/slides/${id}`)
    },

    createSlide(slideData: Partial<Slide>) {
        return api.post<{success: boolean, data: Slide}>('/slides', slideData)
    },

    updateSlide(id: string, slideData: Partial<Slide>) {
        return api.put<{success: boolean, data: Slide}>(`/slides/${id}`, slideData)
    },

    deleteSlide(id: string) {
        return api.delete(`/slides/${id}`)
    }
}