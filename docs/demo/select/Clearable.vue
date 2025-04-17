<script setup>
import { ref } from 'vue'
import Select from '@/components/Select/Select.vue'

const value = ref(2)
const options = ref([
  { label: 'Apple', value: 1 },
  { label: 'Banana', value: 2 },
  { label: 'Orange', value: 3 }
])
</script>

<template>
  <Select 
    v-model="value" 
    :options="options" 
    placeholder="Choose fruits"
    clearable
  />
</template>