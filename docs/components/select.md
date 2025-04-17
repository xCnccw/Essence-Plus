---
title: Select | Essence-Plus
description: Select Component Documentation
---
<!-- 
# Select

A customizable dropdown select component. Supports v-model binding, filtering options, and clearable state.

---

## Basic Usage
The broadly applicable basic radio v-model takes the value of the currently selected option as its value attribute.
<preview path="../demo/select/Basic.vue" title="Basic Usage" description="Use v-model to bind the selected value."></preview>

## Clearable
You can clear the selector by setting the ***clearable*** property.
<preview path="../demo/select/Clearable.vue" title="Clearable" description="Show a clear icon when hovering. Emits `clear` event when clicked."></preview>

## Filterable
You can use the filter functionality to quickly find options.
<preview path="../demo/select/Filter.vue" title="Filterable" description="Input text to filter options using default fuzzy matching."></preview>

---

### Select Attributes

| Name         | Description                        | Type                        | Default |
|--------------|------------------------------------|-----------------------------|---------|
| modelValue   | The bound value                    | `string \| number`          | —       |
| options      | The options to select from         | `SelectOption[]`            | `[]`    |
| placeholder  | Placeholder for the input          | `string`                    | `''`    |
| disabled     | Disable the select                 | `boolean`                   | `false` |
| clearable    | Whether to show a clear icon       | `boolean`                   | `false` |
| filterable   | Whether to enable option filtering | `boolean`                   | `false` |

--- -->

### Select Events

| Name            | Description                              | Parameters                |
|-----------------|------------------------------------------|---------------------------|
| update:modelValue | Emitted when selected value changes      | `(value: string \| number)` |
| change          | Emitted after value changed              | `(value: string \| number)` |
| clear           | Emitted when the input is cleared        | —                         |
| visible-change  | Emitted when dropdown visibility toggles | `(visible: boolean)`      |

---

### Type Definition

```ts
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}
