import './style.css'

import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import en from './locales/en.json'
import fr from './locales/fr.json'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faChartLine, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

library.add(faChevronDown, faChartLine, faUser, faMagnifyingGlass)

const savedLanguage = localStorage.getItem('language')
const defaultLocale = savedLanguage && ['fr', 'en'].includes(savedLanguage) ? savedLanguage : 'en'

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {
        en,
        fr
    }
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')