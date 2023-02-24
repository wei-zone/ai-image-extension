import { defineConfig, loadEnv } from 'vite'
import { r, commonConfig } from './vite.config'
import { replaceCodePlugin } from 'vite-plugin-replace'
import hotReloadContent from './scripts/hot-reload/content'
// 按需导入/自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { __DEV__, outputDir } from './const'
import { dayjs } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: APP_VERSION } = require('./package.json')
// bundling the content script
export default (configEnv: any) => {
    const { mode } = configEnv
    const env = loadEnv(mode, process.cwd())
    // 增加环境变量
    env.APP_VERSION = APP_VERSION
    env.APP_BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss')
    return defineConfig({
        ...commonConfig,
        define: {
            'process.env': JSON.stringify({
                ...env
            })
        },
        build: {
            watch: __DEV__ ? {} : null,
            cssCodeSplit: false,
            emptyOutDir: false,
            sourcemap: false,
            outDir: r(`${outputDir}/contentScript`),
            rollupOptions: {
                input: {
                    contentScript: r('src/contentScript/index.ts')
                },
                output: {
                    assetFileNames: '[name].[ext]',
                    entryFileNames: 'index.js',
                    extend: true,
                    format: 'iife'
                }
            }
        },
        plugins: [
            ...commonConfig.plugins,
            replaceCodePlugin({
                replacements: [
                    {
                        from: /:root\{/g,
                        to: ':host{'
                    }
                ]
            }),
            AutoImport({
                imports: ['vue'],
                dts: 'src/auto-imports.d.ts',
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                // 指定组件位置，默认是src/components
                dirs: ['src/components'],
                // 配置文件生成位置
                dts: 'src/components.d.ts',
                // 自定义组件的解析器，ui库解析器
                resolvers: [ElementPlusResolver()]
            }),
            createStyleImportPlugin({
                resolves: [ElementPlusResolve()]
            }),
            hotReloadContent()
        ]
    })
}
