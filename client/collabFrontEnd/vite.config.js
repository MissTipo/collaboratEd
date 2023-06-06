import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     'react-router-dom': '/node_modules/react-router-dom/esm/react-router-dom.js',
  //   },
  // },
})
