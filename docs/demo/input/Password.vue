<script setup>
import { ref } from 'vue'
import Input from '@/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <Input v-model="test" placeholder="Password text field, can be toggled" showPassword/>
</template>