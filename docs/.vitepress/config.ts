import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
    title: 'Essence Plus',
    description: 'Vue3 Component Library',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide/' },
            { text: 'Components', link: '/components/' }
        ],
        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Introduction', link: '/guide/' },
                        { text: 'Getting Started', link: '/guide/quickstart' }
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