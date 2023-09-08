import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => ({
	build: {
		// cssMinify: false, // disable CSS mininfy only
		minify: false, // disable CSS/JS mininfy only
	},
}));
