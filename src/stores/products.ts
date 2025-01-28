import { defineStore } from 'pinia'
import { productsModule, type Product } from '@/modules/products'

interface ProductsState {
    products: Product[]
    product: Product | null
    loading: boolean
    error: string | null
    pagination: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
}

export const useProductsStore = defineStore('products', {
    state: (): ProductsState => ({
        products: [],
        product: null,
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
        async fetchProducts(page: number = 1) {
            try {
                this.loading = true
                const response = await productsModule.getProducts(page)
                this.products = response.data.data

                const { pagination } = response.data.meta
                this.pagination = {
                    total: pagination.total,
                    currentPage: pagination.current_page,
                    totalPages: pagination.total_pages,
                    perPage: pagination.per_page
                }

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchProduct(id: string) {
            try {
                this.loading = true
                const response = await productsModule.getProduct(id)
                this.product = response.data.data

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async createProduct(productData: Partial<Product>) {
            try {
                this.loading = true
                const response = await productsModule.createProduct(productData)
                this.products.push(response.data.data)

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateProduct(productId: string, productData: Partial<Product>) {
            try {
                this.loading = true
                const response = await productsModule.updateProduct(productId, productData)
                const index = this.products.findIndex(product => product.id === response.data.data.id)
                this.products[index] = response.data.data

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteProduct(productId: string) {
            try {
                this.loading = true
                await productsModule.deleteProduct(productId)
                this.products = this.products.filter(product => product.id !== productId)

                this.error = null
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Une erreur est survenue'
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})