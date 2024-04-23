
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const basePath = ``;

// https://vitejs.dev/config/
export default defineConfig( {
	root: 'src',
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		outDir: '../dist/',
	},
	resolve: {
		alias: {
			"~": path.join( __dirname, "src" ),
		},
	},
	plugins: [
		react(),
	],
	define: {
		BASE_PATH: `"${basePath}"`
	}
} );
