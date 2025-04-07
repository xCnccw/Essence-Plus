<script setup lang="ts">
import Tooltip from '@/components/tooltip/tooltip.vue'
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