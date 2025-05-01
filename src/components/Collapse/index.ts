// Collapse/index.ts
import type { App } from 'vue'
import EsCollapse from './Collapse.vue'
import EsCollapseItem from './CollapseItem.vue'

// 注册组件名（确保组件里也有 defineOptions）
EsCollapse.name = 'EsCollapse'
EsCollapseItem.name = 'EsCollapseItem'

// 给 Collapse 组件添加 install 方法
EsCollapse.install = (app: App): void => {
  app.component(EsCollapse.name as string, EsCollapse)
  app.component(EsCollapseItem.name as string, EsCollapseItem)
}

// 默认导出 Collapse 主组件
export default EsCollapse

// 额外导出 CollapseItem（供库入口 index.ts 统一注册时使用）
export { EsCollapseItem }
