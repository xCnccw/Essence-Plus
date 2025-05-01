import type { App } from 'vue'
import Button from './Button.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Button.install = (app: App): void => {
  app.component(Button.name as string, Button)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Button

