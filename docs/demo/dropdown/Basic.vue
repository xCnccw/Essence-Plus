<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import Button from '@/components/Button/Button.vue'
const options = ref([
  { key: 1, label: 'Edit' },
  { key: 2, label: 'Copy' },
  { key: 3, label: 'Delete' }
])
</script>

<template>
  <Dropdown :menuOption="options" trigger="click">
    <template #default>
      <Button>Actions</Button>
    </template>
  </Dropdown>
</template>
