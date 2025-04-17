<script setup lang="ts">

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import { createAlert } from './components/Alert/createAlert'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { MenuOption } from './components/Dropdown/type'
import { ref, onMounted, h } from 'vue'
import type { ButtonInstance } from './components/Button/type.ts'
import type { TooltipInstance } from './components/Tooltip/type.ts'
import Switch from './components/Switch/Switch.vue'
import Input from './components/Input/Input.vue'
import Select from './components/Select/Select.vue'
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])
const test=ref('')
const switchValue=ref(true)
const Option: MenuOption[] = [
  {
    key: 1,
    label: 'Option 1',
  },
  {
    key: 2,
    label:'Option 2',
    // label: h('h1', 'this is h1'),
    disabled: true
  },
  {
    key: 3,
    label: 'Option 3',
    divided: true
  },
  {
    key: 4,
    label: 'Option 4',
  }
]
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
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
const testvalue= ref()
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




  <Tooltip placement="right-end" trigger="hover" :manual="false" transition="fade" :openDelay="1000" :closeDelay="1000">
    <template #default>
      <button style="width: 200px;height: 200px;">Click me</button>
    </template>
    <template #content>
      <div style="padding: 8px">Custom Tooltip Content</div>
    </template>
  </Tooltip>


  <Dropdown :menuOption="Option" trigger="click" :manual="false" transition="fade" :openDelay="100" :closeDelay="100">
    <template #default>
      <button>Click me</button>
    </template>
    <template #content>
      <div style="padding: 8px">Custom Tooltip Content</div>
    </template>
  </Dropdown>


  <br/>

  <Input v-model="testvalue" placeholder="基础文本框，请输入" />
  <span>{{testvalue}}</span>

  <br/>

  <Switch v-model='switchValue' activeText="ON" inactiveText="OFF" size="large"/>

  <br/>

  <Select v-model="test" :options="options2" placeholder="输入" clearable filterable></Select>
  <span>{{ test }}</span>


</template>

<style scoped></style>
