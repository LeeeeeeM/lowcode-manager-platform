import { resolve } from "path";
import fs from "fs";

import dotenv from "dotenv";
import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import { injectCode } from './inject.env';
import { INJECT_PARAMS } from 'common/inject';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const { VITE_APP_NODE_ENV, VITE_APP_TITLE } = dotenv.parse(
    fs.readFileSync(`.env.${mode}`)
  );

  console.log(
    "\x1b[33m%s\x1b[0m",
    `🏭--NODE 环境 (VITE_APP_NODE_ENV): ${VITE_APP_NODE_ENV}`
  );
  console.log(
    "\x1b[36m%s\x1b[0m",
    `🏠--APP 标题 (VITE_APP_TITLE): ${VITE_APP_TITLE}`
  );

  console.log(command);

  return defineConfig({
    plugins: [
      react(),
      // cssInjectedByJsPlugin(),
      createHtmlPlugin({
        minify: false,
        /**
         * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
         * @default src/main.ts
         */
        entry: "./src/main.tsx",
        /**
         * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
         * @default index.html
         */
        template: "index.html",

        /**
         * 需要注入 index.html ejs 模版的数据
         */
        inject: {
          data: {
            injectScript: `<script id="${INJECT_PARAMS.INJECT_PORTAL_TMP_ID}">
              ${injectCode}
            </script>`,
          }
        },
      }),
    ],
    // 设置根目录
    base: './',
    build: {
      outDir: `build/portal`,
      rollupOptions: {
        output: {
          // 入口文件的输出路径和命名规则
          entryFileNames: `js/[name].js`,
          // 静态资源文件的输出路径和命名规则
          assetFileNames: `[ext]/[name].[ext]`
        }
      }
    },
    server: {
      proxy: {
        "/api/v2/code/": {
          target: "http://dms.smartsteps.com",
          changeOrigin: true,
        },
        "/api/": {
          target: "http://k8s.smartsteps.com:32679",
          changeOrigin: true,
        }
      },
    },
    resolve: {
      alias: [{ find: "/@", replacement: resolve(__dirname, "./src") }],
    },
  });
};
