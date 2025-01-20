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
import {
    faChevronDown,
    faChartLine,
    faMagnifyingGlass,
    faPerson,
    faPenNib,
    faUser,
    faNewspaper,
    faCartShopping,
    faImages,
    faQuestion,
    faArrowUpRightFromSquare,
    faPencil,
    faHardDrive,
    faLink,
    faCheck,
    faFilePdf,
    faFileWord,
    faFilePowerpoint,
    faFileAlt,
    faFileExcel,
    faFileArchive,
    faFileCode,
    faFileAudio,
    faFileVideo,
    faFile,
    faFileImage,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronDown,
    faChartLine,
    faUser,
    faMagnifyingGlass,
    faPerson,
    faPenNib,
    faNewspaper,
    faCartShopping,
    faImages,
    faQuestion,
    faArrowUpRightFromSquare,
    faPencil,
    faHardDrive,
    faLink,
    faCheck,
    faFilePdf,
    faFileWord,
    faFilePowerpoint,
    faFileAlt,
    faFileExcel,
    faFileArchive,
    faFileCode,
    faFileAudio,
    faFileVideo,
    faFile,
    faFileImage,
    faTrash
)

const savedLanguage = localStorage.getItem('language')
const defaultLocale = savedLanguage && ['fr', 'en'].includes(savedLanguage) ? savedLanguage : 'fr'

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'fr',
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