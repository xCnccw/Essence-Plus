<template>
    <div class="es-input" :class="{
        [`es-input--${type}`]: type,
        [`es-input--${size}`]: size,
        'is-disabled': disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus
    }">
        <!-- input -->
        <template v-if="type !== 'textarea'">
            <div v-if="$slots.prepend" class="es-input__prepend">
                <slot name="prepend" />
            </div>
            <div class="es-input__wrapper">
                <span v-if="$slots.prefix" class="es-input__prefix">
                    <slot name="prefix" />
                </span>
                <input class="es-input__inner" ref="inputRef" v-bind="attrs" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
                    :disabled="disabled" :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder"
                    :autofocus="autofocus" :form="form" v-model="innerValue" 
                    @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur">
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="es-input__suffix"  @click="keepFocus">
                    <slot name="suffix" />
                    <Icon icon="circle-xmark" v-if="showClear" class="es-input__clear" @click="clear"
                        @mousedown.prevent="NOOP" />
                    <Icon icon="eye" v-if="showPasswordArea && passwordVisible" class="es-input__password"
                        @click="togglePasswordVisible" />
                    <Icon icon="eye-slash" v-if="showPasswordArea && !passwordVisible" class="es-input__password"
                        @click="togglePasswordVisible" />
                </span>
            </div>
            <div v-if="$slots.append" class="es-input__append">
                <slot name="append" />
            </div>
        </template>
        <!-- textarea -->
        <template v-else>
            <textarea class="es-textarea__wrapper" ref="inputRef" v-bind="attrs" :readonly="readonly" :autocomplete="autocomplete"
                :placeholder="placeholder" :autofocus="autofocus" :form="form" :diasbled="disabled" v-model="innerValue"
                @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, useAttrs,nextTick } from 'vue'
import type { Ref } from 'vue'
import type { InputProps, InputEmits } from './type'
import Icon from '../Icon/Icon.vue'
defineOptions({
    name: 'EsInput'
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const innerValue = ref(props.modelValue)
const attrs = useAttrs()
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>
const emits = defineEmits<InputEmits>()
const NOOP = () => { }
const keepFocus = async () => {
    await nextTick()
    inputRef.value.focus()
}
const handleInput = () => {
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
}
const handleChange = () => {
    emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
    console.log('blur triggered')
    isFocus.value = false
    emits('blur', event)
}
const showClear = computed(() =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value
)
const showPasswordArea = computed(() =>
    props.showPassword &&
    !props.disabled &&
    !!innerValue.value
)
const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
}
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
})
const clear = () => {
    console.log('clear triggered')
    innerValue.value = ''
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
}
defineExpose({
  ref: inputRef
})

</script>