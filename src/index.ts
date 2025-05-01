import type { App } from 'vue'

// 从各组件 index.ts 中导入
import EsAlert from './components/Alert'
import EsButton from './components/Button'
import EsCollapse, { EsCollapseItem } from './components/Collapse'
import EsDropdown from './components/Dropdown'
import EsForm, { EsFormItem } from './components/Form'
import EsIcon from './components/Icon'
import EsInput from './components/Input'
import EsSelect from './components/Select'
import EsSwitch from './components/Switch'
import EsTooltip from './components/tooltip'
import './styles/index.css'
// 所有组件统一放进数组
const components = [
  EsAlert,
  EsButton,
  EsCollapse,
  EsCollapseItem,
  EsDropdown,
  EsForm,
  EsFormItem,
  EsIcon,
  EsInput,
  EsSelect,
  EsSwitch,
  EsTooltip,
]

// 全局注册方法
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name as string, component)
  })
}

// 默认导出，供 app.use() 注册
export default {
  install
}

// 支持按需导入
export {
  EsAlert,
  EsButton,
  EsCollapse,
  EsCollapseItem,
  EsDropdown,
  EsForm,
  EsFormItem,
  EsIcon,
  EsInput,
  EsSelect,
  EsSwitch,
  EsTooltip
}
