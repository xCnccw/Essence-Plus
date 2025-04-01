---
title: Collapse | Essence-Plus
description: Collapse Component Documentation
---

# Collapse
Use `v-model` and `accordion` to control collapsible panels.

Supports arbitrary DOM element content.

## Basic Usage
<preview path="../demo/collapse/Basic.vue" title="Basic Usage" description="Controlled by v-model with array type"></preview>

## Accordion Mode
<preview path="../demo/collapse/Accordion.vue" title="Accordion" description="Only one panel can be expanded at a time"></preview>

## Disabled State
<preview path="../demo/collapse/Disabled.vue" title="Disabled" description="Disable specific collapse items"></preview>


### Collapse Attributes

| Name        | Description                | Type               | Default  |
|------------|---------------------------|--------------------|----------|
| modelValue | current active panels     | `NameType[]`       | []       |
| accordion  | accordion mode            | `boolean`          | false    |

### Collapse Events

| Name     | Description       | Type                 |
|----------|-------------------|----------------------|
| change   | triggers when active panels change | `(value: NameType[]) => void` |

### Type Definition
```typescript
export type NameType = string | number
```