<template>
    <div class="es-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

import { ref, provide, watch } from 'vue'
import type { NameType, CollapseEmits, CollapseProps } from './type.ts'
import { collapseContextKey } from './type.ts'
defineOptions({
    name: 'EsCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, () => {
    activeNames.value = props.modelValue
})//Collapse 组件缺少对父级 openedValue 变化的监听
if (props.accordion && activeNames.value.length > 1) {
    console.log('accordion should only have one achive item');
}
const handleItemClick = (item: NameType) => {
    if (props.accordion) {
        activeNames.value = [activeNames.value[0] === item ? '' : item]
    } else {
        const index = activeNames.value.indexOf(item)
        if (index > -1) {
            activeNames.value.splice(index, 1)
        } else { // 修复 else 语句的缩进
            activeNames.value.push(item)
        } // 添加这个闭合大括号
    }
    emits('update:modelValue', activeNames.value)
    emits('change', activeNames.value)
}
provide(collapseContextKey, {
    activeNames,
    handleItemClick
})
</script>