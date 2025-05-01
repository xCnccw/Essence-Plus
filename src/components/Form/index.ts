// Form/index.ts
import type { App } from 'vue'
import EsForm from './Form.vue'
import EsFormItem from './FormItem.vue'

// 给组件添加 install 方法
EsForm.name = 'EsForm'
EsForm.install = (app: App): void => {
  app.component(EsForm.name as string, EsForm)
}

EsFormItem.name = 'EsFormItem'
EsFormItem.install = (app: App): void => {
  app.component(EsFormItem.name as string, EsFormItem)
}

// 默认导出 Form（常用组件）
export default EsForm

// 额外导出 FormItem（供 index.ts 汇总）
export { EsFormItem }


