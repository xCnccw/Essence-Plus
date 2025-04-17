<script setup>
import Tooltip from '@/components/tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'

</script>
<template>
    <Tooltip>
      <template #default>
        <Button>Hover me</Button>
      </template>
      <template #content>
        <strong>This is <i>rich</i> content</strong>
      </template>
    </Tooltip>
  </template>