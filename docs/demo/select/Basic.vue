<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'

const value = ref('')
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
])
</script>

<template>
  <Select v-model="value" :options="options" placeholder="Please choose" />
</template>