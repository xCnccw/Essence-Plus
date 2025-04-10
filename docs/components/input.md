---
title: Input | V-Element
description: Documentation for the Input component
---

# Input
Enter characters using mouse or keyboard.

## Basic Input

<preview path="../demo/input/Basic.vue" title="Basic Input" description="Basic usage of the Input component"></preview>

## Disabled Input

Use the **disabled** prop to specify whether the input is disabled.

<preview path="../demo/input/Disable.vue" title="Disabled Input" description="Disabled state of the Input component"></preview>

## Size Variants

Use the **size** prop to change the size of the input box. Besides the default size, there are two other options: **large** and **small**.

<preview path="../demo/input/Size.vue" title="Input Sizes" description="Different size variants of the Input component"></preview>

## Compound Input

You can prepend or append elements such as labels or buttons to the input box using the **prepend** and **append** slots.  
Use the **prefix** and **suffix** slots to add elements inside the input.

<preview path="../demo/input/Combo.vue" title="Compound Input" description="Input component with prepend, append, prefix, and suffix"></preview>

## Textarea

For entering multiline text, use a resizable input box.  
Add the **type="textarea"** prop to convert the input into a native `textarea` element.

<preview path="../demo/input/Textarea.vue" title="Textarea" description="Multiline input using textarea"></preview>

## Password Input

Use the **show-password** prop to enable a toggleable password visibility button.

<preview path="../demo/input/Password.vue" title="Password Input" description="Password input with visibility toggle"></preview>

## Clearable Input

Use the **clearable** prop to allow one-click clearing of the input box.

<preview path="../demo/input/Clear.vue" title="Clearable Input" description="Input component with a clear button"></preview>


## Props

| Name              | Description                                                               | Type                                      | Default  |
|-------------------|---------------------------------------------------------------------------|-------------------------------------------|----------|
| `type`            | Native input type                                                         | `'string'`                                | `'text'` |
| `model-value` / `v-model` | Bound value                                                      | `string`                                  | —        |
| `disabled`        | Whether the input is disabled                                             | `boolean`                                 | `false`  |
| `placeholder`     | Placeholder text for the input                                            | `string`                                  | —        |
| `size`            | Size of the input (only applies when `type` is not `'textarea'`)         | `'large'` \| `'small'`                     | —        |
| `show-password`   | Whether to show the toggle password icon                                  | `boolean`                                 | `false`  |
| `clearable`       | Whether to show a clear (reset) button                                    | `boolean`                                 | `false`  |
| `readonly`        | Native `readonly` attribute                                               | `boolean`                                 | `false`  |
| `autofocus`       | Native `autofocus` attribute                                              | `boolean`                                 | `false`  |
| `autocomplete`    | Native `autocomplete` attribute                                           | `string`                                  | `'off'`  |

---

## Events

| Name     | Description                                             | Type                         |
|----------|---------------------------------------------------------|------------------------------|
| `blur`   | Triggered when the input loses focus                    | `(e: FocusEvent) => void`    |
| `focus`  | Triggered when the input gains focus                    | `(e: FocusEvent) => void`    |
| `change` | Triggered when the input loses focus and value changes  | `(e: string) => void`        |
| `input`  | Triggered when the input value changes                  | `(e: string) => void`        |
| `clear`  | Triggered when the clear button is clicked              | `() => void`                 |

---

## Slots

| Name      | Description                 |
|-----------|-----------------------------|
| `prefix`  | Content before the input    |
| `suffix`  | Content after the input     |
| `prepend` | Content prepended to input  |
| `append`  | Content appended to input   |

---

## Exposes

| Name | Description                     | Type                                             |
|------|---------------------------------|--------------------------------------------------|
| `ref`| Input or textarea DOM element   | `Ref<HTMLInputElement \| HTMLTextAreaElement>`  |
