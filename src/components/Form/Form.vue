<template>
  <form class="es-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide,ref } from 'vue';
import type { EsFormContext, FormProps } from './type.ts';
import { EsFormContextKey } from './type.ts';
defineOptions({
  name: 'EsForm'
});
const props = defineProps<FormProps>();
provide(EsFormContextKey, props);

// ✅ 新增：收集所有 EsFormItem
const formItems = ref(new Set<any>());

// 给子组件注册自己（后面 FormItem 会调用）
function registerFormItem(item: any) {
  formItems.value.add(item);
}
// 继续 provide 注册方法
provide('registerFormItem', registerFormItem);
// ✅ 新增：统一 validate 方法
async function validate() {
  let valid = true;
  for (const item of formItems.value) {
    const result = await item.validate();
    console.log(result,'66666');

    if (!result) {
      valid = false;
    }
  }

  if (valid) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Form validation failed'));
  }
}
async function resetFields() {
  console.log('666');

  for (const item of formItems.value) {
    item.resetField?.();  // ✨ 调用每个Item暴露的 resetField
  }
}
async function clearValidate() {
  for (const item of formItems.value) {
    item.clearValidate?.();
  }
}
// ✅ 暴露 validate 方法给外面 formRef 用
defineExpose({
  validate,
  resetFields,
  clearValidate
});
</script>
