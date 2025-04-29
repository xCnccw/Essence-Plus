<template>
  <div class="es-form-item" :class="{ 'is-error': errorMessage, 'is-required': isRequired }" @focusout="handleBlur">
    <div class="es-form-item__label" :class="{ 'is-empty': !props.label }">
      <span v-if="isRequired" class="es-form-item__required">*</span>
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="es-form-item__content">
      <slot />
      <div class="es-form-item__error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { inject, computed, watchEffect, ref, onMounted, watch } from 'vue';
import type { FormItemProps, EsFormContext } from './type.ts';
import { EsFormContextKey } from './type.ts';
import Schema from 'async-validator';
defineOptions({
  name: 'EsFormItem'
});
const props = defineProps<FormItemProps>();
const formContext = inject<EsFormContext>(EsFormContextKey);
const registerFormItem = inject('registerFormItem') as (item: any) => void;
// ✅ 计算自己在 model 里的值
const innerValue = computed(() => {
  if (formContext && props.prop) {
    return formContext.model?.[props.prop];
  }
  return undefined;
});

// 🔥 新增：错误信息
const errorMessage = ref('');
const isRequired = computed(() => {
  const rules = formContext?.rules?.[props.prop ?? ''];
  return Array.isArray(rules) && rules.some((rule: any) => rule.required);
});
// 🔥 新增：校验自己
async function validate(trigger?: string) {
  if (!props.prop) return true;
  console.log('开始校验', props.prop, 'trigger=', trigger);
  const rules = formContext?.rules?.[props.prop] || [];

  const filteredRules = trigger
    ? rules.filter(rule => !rule.trigger || rule.trigger === trigger)
    : rules;

  if (filteredRules.length === 0) return true;

  const descriptor = {
    [props.prop]: filteredRules
  };

  const validator = new Schema(descriptor);
  const model = {
    [props.prop]: innerValue.value
  };

  return validator
    .validate(model)
    .then(() => {
      errorMessage.value = '';
      return true;
    })
    .catch((err) => {
      errorMessage.value = err.errors?.[0]?.message || '验证失败';
      return false;
    });
}

function handleBlur(e: FocusEvent) {
  validate('blur');
}

function resetField() {
  console.log('inner666');

  errorMessage.value = '';
  const model = formContext?.model;
  if (model && props.prop) {
    model[props.prop] = '';  // 这里简单粗暴清空
  }
}
function clearValidate() {
  errorMessage.value = '';
}

onMounted(() => {
  registerFormItem?.({
    validate,
    resetField,  // ✅ 把 resetField 也传给 Form
    clearValidate
  });
});
watch(innerValue, (newVal, oldVal) => {
  console.log('watch innerValue change:', oldVal, '->', newVal);
  if (newVal !== oldVal) {
    validate('change');
  }
});
watchEffect(() => {
  console.log('FormItem prop =', props.prop, '当前 innerValue =', innerValue.value);
});
defineExpose({
  validate,
  resetField,  // ✨ 暴露resetField
  clearValidate,
});
</script>
