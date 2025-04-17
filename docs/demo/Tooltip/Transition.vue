<script setup >
import Tooltip from '@/components/tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'

</script>
<template>
    <Tooltip content="Fade Transition" transition="fade">
      <Button>Hover me</Button>
    </Tooltip>
  </template>