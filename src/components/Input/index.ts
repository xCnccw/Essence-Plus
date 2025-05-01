import type { App } from 'vue'
import Input from './Input.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Input.install = (app: App): void => {
  app.component(Input.name as string, Input)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Input

