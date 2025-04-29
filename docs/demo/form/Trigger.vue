<script setup lang="ts">
import { reactive, ref } from 'vue'
import EsForm from '@/components/Form/Form.vue'
import EsFormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import Select from '@/components/Select/Select.vue'
const model = reactive({
  name: '',
  zone: ''
})
const options = [
  { label: 'zone 1', value: 'one' },
  { label: 'zone 2', value: 'two' },
  { label: 'zone 3', value: 'three' }
]

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  zone: [
    { required: true, message: '请选择区域', trigger: 'change' }
  ]
}

const formRef = ref()
const submit = () => {
  formRef.value.validate().then(() => alert('提交成功')).catch(() => alert('校验失败'))
}
</script>

<template>
  <EsForm :model="model" :rules="rules" ref="formRef">
    <EsFormItem prop="name" label="Name">
      <Input v-model="model.name" placeholder="Blur trigger" />
    </EsFormItem>
    <EsFormItem prop="zone"  label="Zone">
      <Select v-model="model.zone" :options="options" />
    </EsFormItem>
    <EsFormItem>
      <Button @click.prevent="submit" type="primary">Submit</button>
    </EsFormItem>
  </EsForm>
</template>
