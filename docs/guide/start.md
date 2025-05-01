# Getting Started | Essence Plus

Essence Plus is a lightweight and modern Vue 3 UI component library designed for building elegant and responsive web interfaces quickly.

## 💻 Installation

```bash
npm install essence-plus
# or use yarn
yarn add essence-plus
# or pnpm
pnpm add essence-plus
```

## 🔗 Usage

### Option 1: Global Registration (Recommended)

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import EssencePlus from 'essence-plus'
import 'essence-plus/essence-plus.css' // ✅ Global styles

createApp(App).use(EssencePlus).mount('#app')
```

Then you can directly use components in templates:

```vue
<template>
  <EsButton type="primary">Test Button</EsButton>
</template>
```

---

### Option 2: Import Individually

```ts
// Example: Import Button only
import EsButton from 'essence-plus/es/Button'
import 'essence-plus/essence-plus.css' // ⚠️ Still required for styles (currently not split per component)

export default {
  components: { EsButton }
}
```

> 🚧 Component-level CSS splitting is not yet available. It is recommended to keep the global style import.

---
