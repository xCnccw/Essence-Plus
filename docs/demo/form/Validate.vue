<script setup lang="ts">
import { reactive, ref } from 'vue'
import EsForm from '@/components/Form/Form.vue'
import EsFormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import Switch from '@/components/Switch/Switch.vue'
const model = reactive({
  email: '',
  password: '',
  agreement: false
})

const rules = {
  email: [
    { type: 'email', required: true, message: '请输入合法邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  agreement: [
    { type: 'enum', enum: [true], required: true, message: '请同意协议', trigger: 'change' }
  ]
}

const formRef = ref()
const submit = async () => {
  try {
    await formRef.value.validate()
    alert('Passed!')
  } catch (e) {
    alert('Validation failed')
  }
}
</script>

<template>
  <EsForm :model="model" :rules="rules" ref="formRef">
    <EsFormItem prop="email" label="Email">
      <Input v-model="model.email" placeholder="Enter email" />
    </EsFormItem>
    <EsFormItem prop="password" label="Password">
      <Input v-model="model.password" type="password" />
    </EsFormItem>
    <EsFormItem prop="agreement" label="Agreement">
      <Switch v-model="model.agreement" />
    </EsFormItem>
    <EsFormItem>
      <Button @click.prevent="submit" type="primary">Submit</Button>
    </EsFormItem>
  </EsForm>
</template>
