<script setup lang="ts">
import { reactive, ref } from 'vue'
import EsForm from '@/components/Form/Form.vue'
import EsFormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const model = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const formRef = ref()

const submit = () => {
  formRef.value.validate().then(() => alert('Passed!')).catch(() => alert('Failed'))
}

const reset = () => {
  formRef.value.resetFields()
}

const clear = () => {
  formRef.value.clearValidate()
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
    <EsFormItem>
      <Button @click.prevent="submit" type="primary">Submit</Button>
      <Button @click.prevent="reset" type="danger" plain>Reset</Button>
      <Button @click.prevent="clear" type="warning" plain>Clear Validate</Button>
    </EsFormItem>
  </EsForm>
</template>
