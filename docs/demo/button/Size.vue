<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button size="large">Large</Button>
    <Button>Default</Button>
    <Button size="small">Small</Button>
  </div>
</template>
<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>
