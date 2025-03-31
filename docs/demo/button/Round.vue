<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button round>Round</Button>
    <Button type="primary" round>Primary</Button>
    <Button type="success" round>Success</Button>
    <Button type="warning" round>Warning</Button>
    <Button type="danger" round>Danger</Button>
    <Button type="info" round>Info</Button>
  </div>
</template>

<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>