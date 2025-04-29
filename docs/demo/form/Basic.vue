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
  <EsForm :model="model" ref="formRef">
    <EsFormItem prop="email" label="Email">
      <Input v-model="model.email" placeholder="Enter email" />
    </EsFormItem>
    <EsFormItem prop="password" label="Password">
      <Input v-model="model.password" placeholder="Enter password" />
    </EsFormItem>
    <EsFormItem>
      <Button @click.prevent="submit" type="primary">Submit</Button>
    </EsFormItem>
  </EsForm>
</template>
