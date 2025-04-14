<template>
    <div class="es-switch" :class="{
        [`es-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked,
    }" @click="switchValue">
        <input class="es-switch__input" type="checkbox" role="switch" :name="name" ref="input" :disabled="disabled"
            @keydown.enter="switchValue" />
        <div class="es-switch__core">
            <div class="es-switch__core-inner">
                <span v-if="activeText || inactiveText" class="es-switch__core-inner-text">
                    {{ checked ? activeText : inactiveText }}
                </span>
            </div>
            <div class="es-switch__core-action"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SwitchProps, SwitchEmits } from './type.ts'
import { ref, computed, onMounted, watch } from 'vue'
defineOptions({
    name: 'EsSwitch'
})

const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const check = computed(() => innerValue.value)
const input = ref<HTMLInputElement>()
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
    if (props.disabled) return
    const newValue = checked.value ? props.inactiveValue : props.activeValue
    innerValue.value = newValue
    emits('update:modelValue', newValue)
    emits('change', newValue)
}

onMounted(() => {
    input.value!.checked = checked.value
})
watch(checked, (val) => {
    input.value!.checked = val
})
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
})
</script>