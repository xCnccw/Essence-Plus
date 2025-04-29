<!-- <script setup lang="ts">

import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import { createAlert } from './components/Alert/createAlert.ts'
import Tooltip from '@/components/tooltip/tooltip.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { MenuOption } from './components/Dropdown/type.ts'
import { ref, onMounted, h } from 'vue'
import type { ButtonInstance } from './components/Button/type.ts'
import type { TooltipInstance } from './components/tooltip/type.ts'
import Switch from './components/Switch/Switch.vue'
import Input from './components/Input/Input.vue'
import Select from './components/Select/Select.vue'
import Form from '@/components/Form/Form.vue';
import FormItem from '@/components/Form/FormItem.vue';
const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])
const test=ref('')
const switchValue=ref(true)

const formData = ref({
  email: '',
  password: '',
  agreement: false,
  zone: ''
});
const formRef = ref()
const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch(e) {
    console.log('the promise', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}

const zoneOptions = [
  { label: 'Zone A', value: 'A' },
  { label: 'Zone B', value: 'B' }
];

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

  <br/>
  <br/>
  <br/>
  <hr/>

    <Form :model="formData" ref="formRef">
  <FormItem prop="email" label="Email">
    <Input v-model="formData.email" />
  </FormItem>

  <FormItem prop="password" label="Password">
    <Input v-model="formData.password" />
  </FormItem>

  <FormItem prop="agreement" label="Agreement">
    <Switch v-model="formData.agreement" />
  </FormItem>

  <FormItem prop="zone" label="Zone">
    <Select v-model="formData.zone" :options="zoneOptions" placeholder="输入"/>
  </FormItem>

  <FormItem>
    <Button @click.prevent="submit" type="primary">Submit</Button>
    <Button @click.prevent="reset">Reset</Button>
  </FormItem>
</Form>


</template> -->



<script setup lang="ts">
import EsForm from './components/Form/Form.vue';
import EsFormItem from './components/Form/FormItem.vue';
import Input from './components/Input/Input.vue'
import Button from './components/Button/Button.vue'
import { reactive, ref, onMounted } from 'vue';
const formRef = ref();
const formData = reactive({
  email: '',
  password: ''
});

const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur', message: '请输入合法邮箱' }
  ],
  password: [
    { type: 'string', required: true, trigger: 'blur', message: '密码不能为空' },
    { min: 3, max: 5, message: '长度需在 3 到 5 个字符之间', trigger: 'blur' }
  ],
  agreement: [
    { type: 'enum', required: true, enum: [true], message: '请勾选协议' }
  ],
  zone: [
    { type: 'string', required: true, trigger: 'change', message: '请选择地区' }
  ]
};
onMounted(() => {
  console.log('formRef.value', formRef.value);
});
const submit = async () => {
  try {
    await formRef.value.validate();
    console.log('passed');
  } catch (e) {
    console.log('failed', e);
  }
};
const reset = () => {
  formRef.value?.resetFields();    // ✨ 包一层 reset 方法
};

const clear = () => {
  formRef.value?.clearValidate();
};
</script>

<template>
  <EsForm :model="formData" :rules="rules" ref="formRef">
    <EsFormItem prop="email" label="email">
      <Input v-model="formData.email" placeholder="Enter email" />
    </EsFormItem>
    <EsFormItem prop="password" label="password">
      <Input v-model="formData.password" placeholder="Enter password" />
    </EsFormItem>
    <EsFormItem >
      <Button @click.prevent="submit">Submit</Button>

      <Button @click.prevent="reset">Reset</Button>
      <Button @click.prevent="clear">Clear Validate</Button>
    </EsFormItem>
  </EsForm>
</template>
