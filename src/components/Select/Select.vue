<template>
    <div class="es-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown"
        @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
        <Tooltip placement="bottom-start" ref="tooltipRef" :popperOptions="popperOptions"
            @click-outside="controlDropdown(false)" manual>
            <Input v-model="states.inputValue" :disabled="disabled" :placeholder="placeholder" ref="inputRef">
            <template #suffix>
                <Icon icon="circle-xmark" v-if="showClearIcon" class="es-input__clear" @click.stop="onClear"
                    @mousedown.prevent="NOOP" />
                <Icon icon="angle-down" v-else class="header-angle" :class="{ 'is-active': isDropdownShow }" />
            </template>
            </Input>
            <template #content>
                <ul class="es-select__menu">
                    <template v-for="(item, index) in filteredOptions" :key="index">
                        <li class="es-select__menu-item"
                            :class="{ 'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
                            :id="`select-item-${item.value}`" @click.stop="itemSelect(item)">
                            {{ item.label }}
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script setup lang="ts">
import Tooltip from '../tooltipqwe/tooltip.vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { SelectOption, SelectProps, SelectEmits, SelectStates } from './type'
import type { TooltipInstance } from '../tooltipqwe/type'
import type { InputInstance } from '../Input/type'
defineOptions({
    name: 'EsSelect',
})
const props = defineProps<SelectProps>()
const findOption = (value: string) => {
    const option = props.options.find(option => option.value === value)
    return option ? option : null
}
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
    inputValue: initialOption ? initialOption.label : '',
    selectedOption: initialOption,
    mouseHover: false,
})
const emits = defineEmits<SelectEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const innverValue = ref('')
const isDropdownShow = ref(false)
const popperOptions: any = {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9],
            },
        },
        {
            name: "sameWidth",
            enabled: true,
            fn: ({ state }: { state: any }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            phase: "beforeWrite",
            requires: ["computeStyles"],
        }
    ],
}
const showClearIcon = computed(() => {
    return props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
})



const controlDropdown = (show: boolean) => {
    if (show) {
        tooltipRef.value.show()
    } else {
        tooltipRef.value.hide()
    }
    isDropdownShow.value = show
    emits('visible-change', show)
}
const toggleDropdown = () => {
    if (props.disabled) return
    if (isDropdownShow.value) {
        controlDropdown(false)
    } else {
        controlDropdown(true)
    }
}
const onClear = () => {
    states.selectedOption = null
    states.inputValue = ''
    emits('change', '')
    emits('update:modelValue', '')
    emits('clear')
}
const NOOP = () => { }
const itemSelect = (e: SelectOption) => {
    if (e.disabled) return
    states.inputValue = e.label
    states.selectedOption = e
    emits('change', e.value)
    emits('update:modelValue', e.value)
    controlDropdown(false)
    inputRef.value.ref.focus()
}
// filter options by Fuzzy search
const filteredOptions = computed(() => {
  if (!props.filterable) return props.options
  const keyword = states.inputValue.trim()
  const pattern = keyword.split('').join('.*') // "hxl" -> "h.*x.*l"
  const regex = new RegExp(pattern, 'i') // i: ignore case

  return props.options.filter(item =>
    regex.test(item.label)
  )
})

</script>
