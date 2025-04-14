---
title: Switch | Essence-Plus
description: Switch Component Documentation
---

# Switch  
Indicates a switch between two opposing states. Used to trigger on/off.

## Basic Usage
Bind v-model to a Boolean variable. The **--es-switch-on-color** and **--es-switch-off-color** properties are used to set the background color of the switch.
<preview path="../demo/switch/Basic.vue" title="Basic Usage" description="Controlled by v-model with boolean values"></preview>

## Size
Set the **size** property to accept **large/small** and render different sizes.
<preview path="../demo/switch/Size.vue" title="Disabled" description="Prevent interaction with disabled switch"></preview>

## Disabled State
Set the **disabled** property, which accepts a boolean and is set to true to disable it.
<preview path="../demo/switch/Disabled.vue" title="Disabled" description="Prevent interaction with disabled switch"></preview>

## Display Inner Text
Use the **active-text** and **inactivity-text** properties to set the text description of the switch.
<preview path="../demo/switch/WithText.vue" title="With Text" description="Display different text when switch is active/inactive"></preview>

## Custom Active/Inactive Value
You can set **active-value** and **inactivity-value** properties, which accept values of type **boolean | string | number**.
<preview path="../demo/switch/CustomValue.vue" title="Custom Value" description="Use custom active/inactive values like 'on'/'off' or 1/0"></preview>



---

### Switch Attributes

| Name           | Description                              | Type                    | Default        |
|----------------|------------------------------------------|-------------------------|----------------|
| modelValue     | current value                            | `any`                   | —              |
| disabled       | whether to disable the switch            | `boolean`               | `false`        |
| activeValue    | value when switch is active              | `any`                   | `true`         |
| inactiveValue  | value when switch is inactive            | `any`                   | `false`        |
| name           | native input name                        | `string`                | —              |
| activeText     | text when active                         | `string`                | —              |
| inactiveText   | text when inactive                       | `string`                | —              |
| size           | switch size (e.g. `'small'`, `'large'`)  | `string`                | —              |

---

### Switch Events

| Name     | Description                             | Type                         |
|----------|-----------------------------------------|------------------------------|
| change   | triggers when switch value changes      | `(value: any) => void`       |
| update:modelValue | triggers when value changes (for v-model) | `(value: any) => void` |

---


