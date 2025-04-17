---
title: Dropdown | Essence-Plus
description: Dropdown Component Documentation
---

# Dropdown

A dropdown menu component based on `Tooltip`, used to display options triggered by click or hover.

## Basic Usage
<preview path="../demo/dropdown/Basic.vue" title="Basic Usage" description="Dropdown menu triggered by click with selectable options."></preview>

## Hover Trigger
<preview path="../demo/dropdown/Hover.vue" title="Hover Trigger" description="Trigger dropdown menu using hover instead of click."></preview>

## Disabled & Divided
<preview path="../demo/dropdown/Disabled.vue" title="Disabled & Divided" description="Supports disabled items and menu separators."></preview>

## Manual Control
<preview path="../demo/dropdown/Manual.vue" title="Manual Control" description="Use manual trigger and expose show/hide methods via ref."></preview>

---

### Dropdown Attributes

| Name           | Description                                 | Type                        | Default     |
|----------------|---------------------------------------------|-----------------------------|-------------|
| menuOption     | options list to render                      | `MenuOption[]`              | `[]`        |
| trigger        | how to trigger dropdown (`click` / `hover`) | `string`                    | `'click'`   |
| placement      | position of the dropdown                    | `Placement` (`top-end`, etc)| `'bottom'`  |
| popperOptions  | popper.js options                           | `Partial<Options>`          | `{}`        |
| openDelay      | delay in ms before showing                  | `number`                    | `0`         |
| closeDelay     | delay in ms before hiding                   | `number`                    | `200`       |
| manual         | whether to manually control visibility      | `boolean`                   | `false`     |
| hideAfterClick | whether to hide after clicking an item      | `boolean`                   | `true`      |

---

### Dropdown Events

| Name            | Description                             | Type                         |
|-----------------|-----------------------------------------|------------------------------|
| `select`        | emitted when an item is selected        | `(item: MenuOption) => void` |
| `visible-change`| emitted when visibility changes         | `(visible: boolean) => void` |

---

### Exposed Methods

You can use `ref` to access the dropdown instance and call these methods:

| Method | Description           |
|--------|-----------------------|
| `show()` | show the dropdown   |
| `hide()` | hide the dropdown   |

---

### Type Definition

```ts
export interface MenuOption {
  key: string | number
  label: VNode | string
  disabled?: boolean
  divided?: boolean
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}
