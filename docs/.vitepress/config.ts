import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import path from 'path'

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
                        { text: 'Button', link: '/components/button' }
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
                    replacement: path.resolve(__dirname, '../../src')
                }
            ]
        }
    }
})