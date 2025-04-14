<template>
    <Switch v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const value = ref(true)
</script>

