<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="demo-button">
    <Button plain>Plain</Button>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
    <Button type="info" plain>Info</Button>
  </div>
</template>

<style scoped>
.demo-button .es-button + .es-button {
  margin-left: 12px;
}
</style>