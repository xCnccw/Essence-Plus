<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const test = ref(false)
const test2 = ref(false)
</script>
<template>
  Normal: <Switch v-model="test" /> <br/>
  Disabled: <Switch v-model="test2" disabled/>
</template>