import type { VNode } from 'vue'
import type { TooltipProps } from '../tooltip/type'

export interface DropdownProps extends/* @vue-ignore */ TooltipProps {
    menuOption: MenuOption[];
    hideAfterClick?: boolean
}

export interface MenuOption {
    label: string | VNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean;
}

export interface DropdownEmits {
    (e: 'visible-change', value: boolean): void;
    (e:'select', value: MenuOption) : void;
}

export interface DropdownInstance {
    show: () => void;
    hide: () => void;
}
