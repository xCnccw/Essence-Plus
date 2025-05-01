// import type { App } from 'vue'
// import Icon from './Icon.vue'

// // 给组件加上 install 方法以支持 app.use(Button)
// Icon.install = (app: App): void => {
//   app.component(Icon.name as string, Icon)
// }

// // 默认导出（用于全局注册时 app.use(Button)）
// export default Icon

// src/icons/index.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

// 注册所有实心图标
library.add(fas)

export default {
  install(app: App) {
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}
