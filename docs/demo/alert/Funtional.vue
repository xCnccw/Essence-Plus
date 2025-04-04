<template>
  <Button type="success" @click="handleClick">Click me</Button>
</template>
<script setup lang="ts">
import { createAlert } from '@/components/Alert/createAlert'
import Button from '@/components/Button/Button.vue'
const handleClick = () => {
  createAlert({
    type: 'success',
    message: 'Funtional Alert!',
    closable: true,
    duration: 3000
  })
}
</script>
