<template>
    <button ref="_ref" class="es-button" :class="{
        [`es-button--${type}`]: type,
        [`es-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading,

    }" :disabled="disabled||loading" :autofocus="autofocus" :type="nativetype"
    @click="handleClick">
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from './type.ts'
import Icon from '../Icon/Icon.vue'
import { ref } from 'vue'
defineOptions({
    name: 'EsButton'
})

withDefaults(defineProps<ButtonProps>(), {
    nativetype: 'button'
})

const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref: _ref
})

const handleClick = (e: MouseEvent) => {
    const button = _ref.value
    if (!button) return

    const ripple = document.createElement('div')
    ripple.className = 'es-button__ripple'

    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripple.style.width = ripple.style.height = `${size/4}px`
    ripple.style.left = `${x - size/8}px`
    ripple.style.top = `${y - size/8}px`

    button.appendChild(ripple)
    
    // 强制重绘
    ripple.offsetHeight
    
    // 添加动画类
    ripple.classList.add('active')

    ripple.addEventListener('transitionend', () => {
        // 检查元素是否还存在于DOM中
        if (ripple.parentNode === button) {
            button.removeChild(ripple)
        }
    })

    // 添加安全清理机制
    setTimeout(() => {
        if (ripple.parentNode === button) {
            button.removeChild(ripple)
        }
    }, 400) // 与动画时间相同
}
</script>

<style>
.es-button {
    position: relative;
    overflow: hidden;
}

.es-button__ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.35);
    transform: scale(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
}

/* 添加动画类 */
.es-button__ripple.active {
    transform: scale(4);
    opacity: 0;
}
</style>