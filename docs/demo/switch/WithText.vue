<template>
    <Switch v-model="value" activeText="ON" inactiveText="OFF"/>
</template>

<script setup>
import { ref } from 'vue'
import Switch from '@/components/Switch/Switch.vue'
const value = ref(true)
</script>