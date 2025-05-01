import type { App } from 'vue'
import Alert from './Alert.vue'

// 给组件加上 install 方法以支持 app.use(Button)
Alert.install = (app: App): void => {
  app.component(Alert.name as string, Alert)
}

// 默认导出（用于全局注册时 app.use(Button)）
export default Alert

