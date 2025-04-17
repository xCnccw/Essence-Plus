<template>
    <div class="es-dropdown">
        <Tooltip :trigger="trigger" :placement="placement" :popper-options="popperOptions" :open-delay="openDelay"
            :close-delay="closeDelay" :manual="manual" @visible-change="visibleChange" ref="tooltipRef">
            <slot />
            <template #content>
                <ul class="es-dropdown__menu">
                    <template v-for="item in menuOption" :key="item.key">
                        <li v-if="item.divided" role="separator" class="divided-placeholder" />
                        <li class="es-dropdown__item" @click="itemClick(item)"
                            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
                            :id="`dropdown-item-${item.key}`">
                            <RenderVnode :vNode="item.label" />
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import type { Ref } from 'vue'
import RenderVnode from '../../hooks/renderVnode.ts'
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './type'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/type.ts'
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
defineOptions({
    name: 'EsDropdown'
})
const visibleChange = (e: boolean) => {
    emits('visible-change', e)
}
const itemClick = (e: MenuOption) => {
    if (e.disabled) {
        return
    }
    emits('select', e)
    if (props.hideAfterClick) {
        tooltipRef.value?.hide()
    }
}
defineExpose<DropdownInstance>({
    show: () => tooltipRef.value?.show(),
    hide: () => tooltipRef.value?.hide()
})
</script>