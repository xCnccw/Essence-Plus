<template>
    <div ref="vantaRef" class="vanta-wrapper">
      <slot />
    </div>
  </template>
  
  <script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import { useData } from 'vitepress'
  import WAVES from 'vanta/src/vanta.waves'
  import * as THREE from 'three'
  
  const vantaRef = ref(null)
  const { isDark } = useData()
  
  let effect = null
  
  const initVanta = () => {
    if (effect) {
      effect.destroy()
      effect = null
    }
  
    effect = WAVES({
      el: vantaRef.value,
      THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: isDark.value ? 0x0f172a :  0x868dd4, // 🌙 深蓝 / ☀️ 浅蓝
      shininess: 50,
      waveHeight: 20,
      waveSpeed: 0.7,
      zoom: 0.8,
      backgroundColor: isDark.value ? 0x000000 : 0xf8fafc // 🌙 黑 / ☀️ 极浅灰
    })
  }
  
  onMounted(() => {
    initVanta()
  })
  
  onUnmounted(() => {
    if (effect) effect.destroy()
  })
  
  // 🌗 监听主题变化
  watch(isDark, () => {
    initVanta()
  })
  </script>
  
  <style scoped>
  .vanta-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
  }
  </style>
  