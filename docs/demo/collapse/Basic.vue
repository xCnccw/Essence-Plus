<script setup lang="ts">
import { ref } from 'vue'
const activeNames = ref(['a'])
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue' 
</script>

<template>
  <Collapse v-model="activeNames">
    <CollapseItem name="a" title="Item A">
        <h1>headline title</h1>
        <div> this is content </div>
    </CollapseItem>
    <CollapseItem name="b" title="Item B">
      Content B
    </CollapseItem>
  </Collapse>
</template>