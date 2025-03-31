<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button circle>D</Button>
    <Button type="primary" circle>P</Button>
    <Button type="success" circle>S</Button>
    <Button type="warning" circle>W</Button>
    <Button type="danger" circle>D</Button>
    <Button type="info" circle>I</Button>
  </div>
</template>

<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>