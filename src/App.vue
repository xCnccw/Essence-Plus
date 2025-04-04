<script setup lang="ts">

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import { createAlert } from './components/Alert/createAlert'
import { ref, onMounted, h } from 'vue'
import type { ButtonInstance } from './components/Button/type.ts'
const buttonRef = ref<ButtonInstance | null>(null)
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
</script>

<template>
  <Alert>123123</Alert>
  <Button ref="buttonRef">Test Button</Button>
  <Button type="success" plain>Plain Button</Button>
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
</template>

<style scoped></style>
