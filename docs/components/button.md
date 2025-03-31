---
title: Button | Essence-Plus
description: Button Component Documentation
---

# Button
Use `type`, `plain`, `round` and `circle` to define button styles.

## Button Type
Use the `type` attribute to define different button styles.
<preview path="../demo/button/Type.vue" title="Button Type" description="Button types include: default, primary, success, warning, danger and info"></preview>

## Button Size
Use the `size` attribute to define button size.
<preview path="../demo/button/Size.vue" title="Button Size" description="Buttons come in three sizes: large, default and small"></preview>

## Plain Button
Use the `plain` attribute to define a plain button.
<preview path="../demo/button/Plain.vue" title="Plain Button" description="Plain buttons have colored text while their backgrounds are white"></preview>

## Round Button
Use the `round` attribute to define a round button.
<preview path="../demo/button/Round.vue" title="Round Button" description="Round buttons have larger border radius"></preview>

## Circle Button
Use the `circle` attribute to define a circle button.
<preview path="../demo/button/Circle.vue" title="Circle Button" description="Circle buttons are commonly used for icon buttons"></preview>

## Disabled
Use the `disabled` attribute to define whether a button is disabled.
<preview path="../demo/button/Disabled.vue" title="Disabled" description="The button is not available when disabled"></preview>

### Button Attributes

| Name       | Description    | Type                                                    | Default |
|------------|---------------|--------------------------------------------------------|---------|
| size       | button size   | `'large' \| 'small'`                                    | —       |
| type       | button type   | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —     |
| plain      | determine whether it's a plain button | `boolean`                        | false   |
| round      | determine whether it's a round button | `boolean`                        | false   |
| circle     | determine whether it's a circle button | `boolean`                       | false   |
| disabled   | disable the button | `boolean`                                          | false   |
| autofocus  | same as native button's `autofocus` | `boolean`                         | false   |
| nativetype | same as native button's `type` | `'button' \| 'submit' \| 'reset'`      | button  |
