import { defineStore } from 'pinia'

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [],
        loading: false
    }),
    actions: {
        async fetchCustomers() {
            this.loading = true
            const response = await fetch('https://randomuser.me/api/?results=15')
            this.loading = false
            const data = []
            this.customers = data.results
        }
    }
})