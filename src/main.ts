import './style.css'

import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import en from './locales/en.json'

const app = createApp(App)
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en
    }
})

app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
