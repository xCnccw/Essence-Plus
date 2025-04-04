<template>
    <Transition name="fade" @after-leave="handleDestroy">
        <div class="es-alert" :class="[
  `es-alert--${type}`,
  `is-${effect}`,
  { closable },
  isComponentMode ? 'is-component' : 'is-functional'
]" v-if="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="es-alert__content">
                <slot>
                    <RenderVnode :vNode="message" v-if="message" />
                </slot>
            </div>
            <div v-if="closable" class="es-alert__close" @click="handleClick">
                <Icon icon="xmark" />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AlertProps } from './type.ts'
import RenderVnode from './renderVnode.ts'
const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  closable: false,
  duration: 3000,  
  effect: 'light',
  isFunctional: false 
})

defineOptions({
    name: 'EsAlert'
})
const visible = ref(true)
defineExpose({
    visible
})
const handleDestroy = () => {
    props.onDestroy?.()
}

let timer: ReturnType<typeof setTimeout> | null = null

// 新增组件模式判断
const isComponentMode = !props.isFunctional  // [!code ++]

const startTimer = () => {
  // 组件模式禁用自动关闭
  if (isComponentMode) return
  
  if (props.duration && props.duration > 0) {
    timer = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
}
const clearTimer = () => {
    if (timer) clearTimeout(timer)
    timer = null
}

onMounted(() => {
    startTimer()
})

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer)
})

const handleClick = () => {
    if (!props.closable) return
    visible.value = false

}

</script>