<script setup lang="ts">
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'

const activeNames = ref(['a'])
</script>

<template>
  <Collapse v-model="activeNames">
    <CollapseItem name="a" title="Normal Item">
      <div>Interactive Content</div>
    </CollapseItem>
    <CollapseItem 
      name="b" 
      title="Disabled Item"
      disabled
    >
      <div>This content cannot be expanded</div>
    </CollapseItem>
  </Collapse>
</template>