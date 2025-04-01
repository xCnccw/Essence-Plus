import type { Ref,InjectionKey } from 'vue'
export type NameType = string | number

export type CollapseProps = {
    modelValue: NameType[];
    accordion?: boolean;
}

export interface CollapseItemProps {
    name: NameType,
    title?: string,
    disabled?: boolean
}

export interface CollapseContext {
    activeNames: Ref<NameType[]>;
    handleItemClick: (name: NameType) => void
}

export type CollapseEmits = {
    (e:'update:modelValue',values:NameType[]): void
    (e:'change',name:NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')