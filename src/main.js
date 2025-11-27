import { createApp } from 'vue'
import './style.css'
import Root from './Root.vue'  // <-- minimal root
import router from './router/router.js'
import i18n from './i18n.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(Root)
app.use(router)
app.use(i18n)
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    v: "weekly",
    libraries: "places",
  },
})
app.mount('#app')
