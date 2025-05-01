import type { App } from 'vue'
import tooltip from './tooltip.vue'

// 给组件加上 install 方法以支持 app.use(Button)
tooltip.install = (app: App): void => {
  app.component(tooltip.name as string, tooltip)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default tooltip

