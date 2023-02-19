import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { dayjs } from 'element-plus'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version: APP_VERSION } = require('./package.json')

// https://vitejs.dev/config/
export default (configEnv: any) => {
    const { mode } = configEnv
    const env = loadEnv(mode, process.cwd())
    // 增加环境变量
    env.APP_VERSION = APP_VERSION
    env.APP_BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss')

    // 插件
    const plugins = [vue(), vueJsx()]

    return defineConfig({
        base: '/',
        server: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            open: false,
            port: 30001,
            host: '0.0.0.0'
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            sourcemap: true,
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                output: {
                    // format: 'cjs',
                    // entryFileNames: 'main-app.js',
                    manualChunks(id, { getModuleInfo }) {
                        // 打包依赖
                        if (id.includes('node_modules')) {
                            return 'vendor'
                        }
                        const reg = /(.*)\/src\/components\/(.*)/
                        if (reg.test(id)) {
                            // @ts-ignore
                            const importersLen = getModuleInfo(id).importers.length
                            // 被多处引用
                            if (importersLen > 1) {
                                return 'common'
                            }
                        }
                    },
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        },
        define: {
            'process.env': JSON.stringify({
                ...env
            })
        },
        plugins
    })
}
