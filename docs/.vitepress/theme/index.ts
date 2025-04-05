import DefaultTheme from 'vitepress/theme'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../../../src/styles/index.css'
import VantaBackground from '../../components/VantaBackground.vue'
import './style.css' // 👈 记得写对路径


library.add(fas)
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer),
    app.component('VantaBackground', VantaBackground)
  }
}