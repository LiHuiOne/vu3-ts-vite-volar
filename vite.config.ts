import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: '127.0.0.1',
		port: 3333,
		open: true,
		proxy: {

		}
	},
	resolve:{
		alias:{
			'@': resolve(__dirname, 'src')
		}
	},
	plugins: [vue()]
})
