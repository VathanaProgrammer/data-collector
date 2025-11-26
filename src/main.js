import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import i18n from './i18n.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'
console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    v: "weekly",   // <---- FIXED (use latest)
    libraries: "places",
  },
})

app.mount('#app')

