import type { VNode } from 'vue'

export interface AlertProps {
    /** 标识是否为函数式调用 */
    isFunctional?: boolean;  // [!code ++]
    /** 主题类型 */
    message?: string | VNode;
    type?: 'success'| 'info'| 'warning'| 'danger';
    /** 是否显示关闭按钮 */
    closable?: boolean;
    duration?: number;
    effect?: 'light' | 'dark';
    onDestroy?: () => void;
  }