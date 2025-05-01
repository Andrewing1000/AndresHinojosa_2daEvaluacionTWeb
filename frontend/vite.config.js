import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'


export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // Opciones del plugin:
      cache: false,
      include: ['src/**/*.js', 'src/**/*.vue'],
      exclude: ['node_modules']
    })
  ],
})