---
title: Alert | Essence-Plus
description: Alert Component Documentation
---

# Alert
Component for displaying feedback messages

## Basic Usage
Supports four types via the type prop: success, warning, danger, and info. Defaults to info.
<preview path="../demo/alert/Basic.vue" title="Basic" description="支持主题切换和关闭操作"></preview>

## Theme Types
<preview path="../demo/alert/Type.vue" title="Type"></preview>

## Closable
<preview path="../demo/alert/Closable.vue" title="Closable"></preview>

## Function Mode
Use the createAlert() utility to trigger alerts programmatically.
<preview path="../demo/alert/Funtional.vue" title="Funtional"></preview>




## API

### Alert Attributes
| Attribute | Description                         | Type                                | Default |
|-----------|-------------------------------------|-------------------------------------|---------|
| `type`    | Theme type                          | `success` \| `warning` \| `danger` \| `info` | `info`  |
| `effect`  | Style theme                         | `light` \| `dark`                   | `light` |
| `closable`| Whether it is closable              | `boolean`                           | `false` |
| `duration`| Auto-close delay in ms (0 disables) | `number`                            | `3000`  |
| `message` | Message content (VNode or string)   | `string` \| `VNode`                 | —       |


### Alert Events
| Event  | Description       | Parameters |
|--------|-------------------|------------|
| close  | Trigger on close  | -          |

### Alert Slots
| Name     | Description       |
|----------|-------------------|
| default  | Custom content    |