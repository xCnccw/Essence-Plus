<script setup lang="ts">

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import { createAlert } from './components/Alert/createAlert'
import Tooltip from './components/Tooltip/tooltip.vue'
import { ref, onMounted, h } from 'vue'
import type { ButtonInstance } from './components/Button/type.ts'
import type { TooltipInstance } from './components/Tooltip/type.ts'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
  createAlert({
    message: h('p', 'Hello VNode!'),
    effect: 'dark',
    type: 'success',
    duration: 3000,
    closable: true
  })
})
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>

<template>

  <Alert>123123</Alert>
  <Button ref="buttonRef" @click="open">Test Button</Button>
  <Button type="success" plain @click="close">Plain Button</Button>
  <Button round type="danger">Round Button</Button>
  <Button circle type="info">ES</Button>
  <Button disabled type="warning">Disabled Button</Button><br /><br />
  <Button type="warning" loading>Disabled Button</Button>
  <Collapse v-model="openedValue" accordion>
    <Item name="a" title="title a">
      <div>this is content a aaa</div>
    </Item>

    <Item name="b" title="title b">
      <div>this is bbbbb test</div>
    </Item>

    <Item name="c" title="title cccc" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
  {{ openedValue }}




  <Tooltip placement="right-end" trigger="hover" :manual="false" transition="fade" :openDelay="3000" :closeDelay="200"></Tooltip>
    <template #default>
      <button style="width: 500px;height: 500px;">Click me</button>
    </template>
    <template #content>
      <div style="padding: 8px">Custom Tooltip Content</div>
    </template>
  </Tooltip>

</template>

<style scoped></style>
