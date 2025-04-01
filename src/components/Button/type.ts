import type { PropType } from 'vue'
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'large'
export type Nativetype = 'button' | 'submit' | 'reset'

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    nativetype?: Nativetype;
    autofocus?: boolean;
    icon?: string;
    loading?: boolean;
}

export interface ButtonInstance {
    ref: HTMLButtonElement
}

export const buttonProps ={
    type: {
        type: String as PropType<ButtonType>
    },
    size: {
        type: String as PropType<ButtonSize>
    },
    plain: {
        type: Boolean
    },  
    round: {
        type: Boolean
    },
    circle: {
        type: Boolean
    },
    disabled: {
        type: Boolean
    },
    nativetype: {
        type: String as PropType<Nativetype>
    },
    autofocus: {
        type: Boolean
    }
}