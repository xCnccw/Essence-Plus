import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
    title: 'Essence Plus',
    description: 'Vue3 Component Library',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide/start' },
            { text: 'Components', link: '/components/button' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Getting Started', link: '/guide/start' }
                    ]
                }
            ],
            '/components/': [
                {
                    text: 'Basic Components',
                    items: [
                        { text: 'Button', link: '/components/button' },
                        { text: 'Collapse', link: '/components/collapse' },
                        { text: 'Alert', link: '/components/alert' },
                        { text: 'Tooltip', link: '/components/tooltip' },
                        { text: 'Input', link: '/components/input' },
                        { text: 'Switch', link: '/components/switch' },
                        { text: 'Dropdown', link: '/components/dropdown' },
                        { text: 'Select', link: '/components/select' },
                        { text: 'Form', link: '/components/form' },
                    ]
                }
            ]
        }
    },
    markdown: {
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        }
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('../../src', import.meta.url))
                }
            ]
        }
    }
})
