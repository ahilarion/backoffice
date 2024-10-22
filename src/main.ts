import './style.css'

import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import en from './locales/en.json'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";


library.add(faChevronDown, faChartLine, faCalendar)

const app = createApp(App)
const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en
    }
})

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
