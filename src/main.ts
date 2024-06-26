import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI  } from 'vuefire'
import { firebaseApp } from '@/plugins/firebase'
import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth(),
        VueFireFirestoreOptionsAPI()
    ],
})
app.use(VueImageZoomer);

app.mount('#app')