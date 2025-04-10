<script setup>
import { ref } from 'vue'
import Input from '@/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <div class="size-holder">
    <Input v-model="test" placeholder="Large Input" size="large">
    </Input>
    <Input v-model="test" placeholder="normal Input">
    </Input>
    <Input v-model="test" placeholder="small Input" size="small">
    </Input>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>