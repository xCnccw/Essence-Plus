<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import Button from '@/components/Button/Button.vue'
const options = ref([
  { key: 1, label: 'Normal item' },
  { key: 2, label: 'Disabled item', disabled: true },
  { key: 3, label: 'With divider', divided: true }
])
</script>

<template>
  <Dropdown :menuOption="options">
    <template #default>
      <Button>Options</Button>
    </template>
  </Dropdown>
</template>