import AutoImport from "unplugin-auto-import/vite";
// import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig(({ command, mode, ssrBuild }) => ({
	// Getting rid of hashes in generated filenames
	// filenameHashing: false,
	/* build: {
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
	}, */

	server: {
		// open the server with google chrome browser
		open:
		process.env.BROWSER="E:\\Apps\\scoop\\apps\\googlechrome-dev\\current\\chrome.exe",
	},
	/* 	resolve: {
		alias: {
			// "~gerillass": path.resolve(__dirname, "node_modules/gerillass/scss/gerillass.scss"),
		},
	}, */
	plugins: [
		dynamicImport(/* options */),
		AutoImport({
			/* options */
		}),
		ViteAliases(),
	],
}));
