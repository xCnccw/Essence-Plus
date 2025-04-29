import type { InjectionKey } from 'vue';

export interface FormProps {
  model: Record<string, any>;
  rules?: Record<string, any>;  // ✅ 加上这行
}

export interface FormItemProps {
  prop?: string;
  label?: string; // ✅ 补上这个
}

export interface EsFormContext extends FormProps {}

export const EsFormContextKey: InjectionKey<EsFormContext> = Symbol('EsFormContext');
