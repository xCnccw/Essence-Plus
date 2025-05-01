import type { App } from 'vue'
import Switch from './Switch.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Switch.install = (app: App): void => {
  app.component(Switch.name as string, Switch)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Switch

