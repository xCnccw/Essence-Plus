<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button disabled>Disabled</Button>
    <Button type="primary" disabled>Primary</Button>
    <Button type="success" disabled>Success</Button>
    <Button type="warning" disabled>Warning</Button>
    <Button type="danger" disabled>Danger</Button>
    <Button type="info" disabled>Info</Button>
  </div>
</template>

<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>