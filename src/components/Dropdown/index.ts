import type { App } from 'vue'
import Dropdown from './Dropdown.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Dropdown.install = (app: App): void => {
  app.component(Dropdown.name as string, Dropdown)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Dropdown

