<script setup >
import Tooltip from '@/components/tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
import { ref } from 'vue'
const tooltipRef = ref()
</script>
<template>
    <Tooltip ref="tooltipRef" content="Manual control" manual>
      <Button @click="tooltipRef?.show()">Show</Button>
    </Tooltip>
  </template>
  