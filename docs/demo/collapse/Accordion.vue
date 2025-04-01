<script setup lang="ts">
import { ref } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'

const activeNames = ref(['a'])
</script>

<template>
  <Collapse v-model="activeNames" accordion>
    <CollapseItem name="a" title="Accordion Item A">
      <div>Content Section A</div>
    </CollapseItem>
    <CollapseItem name="b" title="Accordion Item B">
      <div>Content Section B</div>
    </CollapseItem>
    <CollapseItem name="c" title="Accordion Item C">
      <div>Content Section C</div>
    </CollapseItem>
  </Collapse>
</template>