export type SwitchValueType = boolean | string | number;
export interface SwitchProps {
    modelValue: SwitchValueType;
    disabled?: boolean;
    activeText?: string;
    inactiveText?: string;
    activeValue?: SwitchValueType;
    inactiveValue?: SwitchValueType;
    name?: string;
    id?: string;
    size?: 'large' | 'small';
}

export interface SwitchEmits {
    (event: 'update:modelValue', value: SwitchValueType): void; //v-model的默认事件；在 Vue 3 Composition API 中，v-model 不再自动处理双向绑定，你必须显式地 emit 事件：
    (event: 'change', value: SwitchValueType): void;
}