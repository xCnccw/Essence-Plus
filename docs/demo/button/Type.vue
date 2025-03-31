<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <Button type="info">Info</Button>
  </div>
</template>

<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>