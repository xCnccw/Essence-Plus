<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import Button from '@/components/Button/Button.vue'
const options = ref([
  { key: 1, label: 'Profile' },
  { key: 2, label: 'Settings' }
])
</script>

<template>
  <Dropdown :menuOption="options" trigger="hover">
    <template #default>
      <Button>Hover me</Button>
    </template>
  </Dropdown>
</template>