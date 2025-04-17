<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
import { ref } from 'vue'
const tooltipRef = ref()
</script>
<template>
    <Tooltip ref="tooltipRef" content="Manual control" manual>
      <Button @click="tooltipRef?.show()">Show</Button>
    </Tooltip>
  </template>
  