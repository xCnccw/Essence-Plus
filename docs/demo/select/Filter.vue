<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'

const value = ref('')
const options = ref([
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'py' },
  { label: 'Java', value: 'java' }
])
</script>

<template>
  <Select
    v-model="value"
    :options="options"
    placeholder="Fuzzy search"
    filterable
  />
</template>