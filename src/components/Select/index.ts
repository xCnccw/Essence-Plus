import type { App } from 'vue'
import Select from './Select.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Select.install = (app: App): void => {
  app.component(Select.name as string, Select)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Select

