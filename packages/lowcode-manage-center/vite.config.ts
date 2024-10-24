import { resolve } from 'path'
import fs from 'fs'

import dotenv from 'dotenv'
import { defineConfig, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const { VITE_APP_NODE_ENV, VITE_APP_TITLE } = dotenv.parse(fs.readFileSync(`.env.${mode}`))

  console.log('\x1b[33m%s\x1b[0m', `🏭--NODE 环境 (VITE_APP_NODE_ENV): ${VITE_APP_NODE_ENV}`)
  console.log('\x1b[36m%s\x1b[0m', `🏠--APP 标题 (VITE_APP_TITLE): ${VITE_APP_TITLE}`)

  console.log(command)


  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api/v2/code/': {
          target: 'http://dms.smartsteps.com',
          changeOrigin: true
        },
        '/api/': {
          target: 'http://k8s.smartsteps.com:32679',
          changeOrigin: true
        },
      }
    },
    resolve: {
      alias: [{ find: '/@', replacement: resolve(__dirname, './src') }],
    },
  })
}
