
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles/index.css'

library.add(fas)


const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
