---
title: Form | Essence-Plus
description: Form Component Documentation
---

# Form

`EsForm` is a form container component used for data collection, validation, and submission. It supports async validation, custom rules, reset, and clearing methods.

## Basic Usage
<preview path="../demo/form/Basic.vue" title="Basic Usage" description="Basic input and submission validation."></preview>

## Validation
<preview path="../demo/form/Validate.vue" title="Validation" description="Supports required, email, length constraints, and custom validators."></preview>

## Reset and Clear Validation
<preview path="../demo/form/ResetClear.vue" title="Reset and Clear" description="Supports resetFields and clearValidate methods."></preview>

## Triggering Validation
<preview path="../demo/form/Trigger.vue" title="Validation Triggers" description="Supports blur and change trigger types."></preview>

---

### EsForm Attributes

| Name        | Description                           | Type                      | Default     |
|-------------|---------------------------------------|---------------------------|--------------|
| `model`     | Form data object (reactive)           | `Record<string, any>`     | —            |
| `rules`     | Validation rule object                | `FormRules`               | —            |

---

### EsForm Methods

Use `ref` to access the `EsForm` instance and call the following methods:

| Method               | Description                          |
|----------------------|--------------------------------------|
| `validate()`         | Validate all fields, returns `Promise` |
| `resetFields()`      | Reset all field values               |
| `clearValidate()`    | Clear validation state of all fields |

---

### EsFormItem Attributes

| Name     | Description                    | Type      | Default   |
|----------|--------------------------------|-----------|-----------|
| `label`  | Label text                     | `string`  | —         |
| `prop`   | Field name in the `model`      | `string`  | —         |

---

### Validation Rules (FormRules)

```ts
export interface FormRules {
  [prop: string]: Array<FormRule>
}

export interface FormRule {
  required?: boolean
  type?: string // e.g. "string", "email", "enum"
  min?: number
  max?: number
  enum?: any[]
  message?: string
  trigger?: 'blur' | 'change'
  validator?: (value: any) => boolean | string
}
