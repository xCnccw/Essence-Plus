<script setup lang="ts">

import Button from './components/Button/Button.vue'
import { ref, onMounted } from 'vue'
import type { ButtonInstance } from './components/Button/type.ts'
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
    <Button ref="buttonRef">Test Button</Button>
    <Button type="success" plain >Plain Button</Button>
    <Button round type="danger">Round Button</Button>
    <Button circle type="info">ES</Button>
    <Button disabled type="warning">Disabled Button</Button><br/><br/>  
</template>

<style scoped>

</style>
