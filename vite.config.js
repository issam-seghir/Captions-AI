import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import dynamicImport from "vite-plugin-dynamic-import";
import webfontDownload from "vite-plugin-webfont-dl";
import { ViteAliases } from 'vite-aliases'

export default defineConfig(({ command, mode, ssrBuild }) => ({
	// Getting rid of hashes in generated filenames
	filenameHashing: false,
	build: {
		// cssMinify: false, // disable CSS mininfy only
		minify: false, // disable CSS/JS mininfy only
		// change output location
		rollupOptions: {
			output: {
				manualChunks: undefined,
				assetFileNames: "assets/[name].[ext]", // Output assets (e.g., images, SVGs) to the assets folder
				entryFileNames: "[name].js", // Output entry files (e.g., JavaScript) to the root directory
				chunkFileNames: "assets/[name].[ext]", // Output dynamic imports (chunks) to the assets folder
			},
		},
	},
	plugins: [
		webfontDownload([], {
			injectAsStyleTag: true,
			// minifyCss: true,
		}),
		dynamicImport(/* options */),
		Icons({
			scale: 1.2, // Scale of icons against 1em
			defaultStyle: "", // Style apply to icons
			defaultClass: "", // Class names apply to icons
			compiler: null, // 'vue2', 'vue3', 'jsx'
			jsx: "react", // 'react' or 'preact'
			// experimental : install the icon set when you import them
			autoInstall: true,
		}),
		AutoImport({
			/* options */
		}),
		ViteAliases(),
	],
}));
