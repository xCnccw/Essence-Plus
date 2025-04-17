---
title: Tooltip | Essence-Plus
description: Tooltip Component Documentation
---

# Tooltip  
A lightweight and flexible component for displaying contextual tooltips.

## Basic Usage  
Default tooltip usage with `hover` trigger and `bottom` placement. Demonstrates how to wrap content and show simple text tooltips.  
<preview path="../demo/Tooltip/Basic.vue" title="Basic Usage" description="Default placement and hover trigger"></preview>

## Placement  
Controlled by the `placement` prop. Format: `[direction]-[alignment]`. Directions: `top`, `bottom`, `left`, `right`; Alignments: `start`, `end` (default is centered).  
<preview path="../demo/Tooltip/Placement.vue" title="Placement Variants" description="Support for top, bottom, left, right and alignment control"></preview>

## Trigger  
Determines how the tooltip is activated. Use the `trigger` prop to choose between `hover` or `click`.  
<preview path="../demo/Tooltip/Trigger.vue" title="Trigger Mode" description="Click or hover trigger supported"></preview>

## Content Slot  
Customize tooltip content using the `content` slot. Supports plain text, HTML, or VNode content.  
<preview path="../demo/Tooltip/Slot.vue" title="Custom Content Slot" description="Define content using slot"></preview>

## Manual Control  
Enable `manual` mode to control tooltip visibility programmatically via `show()` and `hide()` methods using `ref`.  
<preview path="../demo/Tooltip/Manual.vue" title="Manual Mode" description="Control tooltip manually via ref"></preview>

## Transition  
Customize tooltip animations using the `transition` prop. Accepts a CSS transition name (e.g., `fade`, `slide`, etc).  
<preview path="../demo/Tooltip/Transition.vue" title="Custom Transition" description="Custom animation for tooltip"></preview>

## Open & Close Delay  
Use `openDelay` and `closeDelay` to delay the tooltip's appearance or disappearance in milliseconds.  
<preview path="../demo/Tooltip/Delay.vue" title="Open and Close Delay" description="Delay for show and hide behavior"></preview>


## API

### Tooltip Props

| Name           | Description                                     | Type                         | Default    |
|----------------|-------------------------------------------------|------------------------------|------------|
| placement      | Tooltip position                                | `top` \| `top-start` \| `top-end` \| `bottom` \| `bottom-start` \| `bottom-end` \| `left` \| `left-start` \| `left-end` \| `right` \| `right-start` \| `right-end` | `bottom` |
| trigger        | Trigger method                                  | `'hover'` \| `'click'`       | `'hover'`  |
| manual         | Manual control mode                            | `boolean`                    | `false`    |
| transition     | Transition animation name                      | `string`                     | `'fade'`   |
| openDelay      | Delay before showing (ms)                     | `number`                     | `0`        |
| closeDelay     | Delay before hiding (ms)                      | `number`                     | `0`        |
| popperOptions  | Popper.js configuration                       | `Partial<Options>` (import from `@popperjs/core`) | `{}`       |

### Events

| Name             | Description                        | Parameters           |
|------------------|------------------------------------|----------------------|
| visible-change   | Emitted when visibility changes    | `(visible: boolean)` |

### Slots

| Slot Name | Description                         |
|-----------|-------------------------------------|
| default   | Trigger element                     |
| content   | Custom tooltip content              |

### Instance Methods

```ts
// Access via component ref
tooltipRef.value?.show()  // Show tooltip
tooltipRef.value?.hide()  // Hide tooltip