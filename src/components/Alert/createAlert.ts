import { createVNode, render } from 'vue'
import EsAlert from './Alert.vue'
import type { AlertProps } from './type'

export const createAlert = (props: AlertProps) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(EsAlert, {
    ...props,
    isFunctional: true,  // [!code ++]
    onDestroy: () => {
      render(null, container)
      document.body.removeChild(container)
    }
  })

  render(vnode, container)

  return {
    close: () => {
      vnode.component!.exposed!.visible.value = false
    }
  }
}


