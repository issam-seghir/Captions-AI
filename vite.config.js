// import Icons from "unplugin-icons/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig(({ command, mode, ssrBuild }) => ({
	base: "/Captions-AI/",
	// Getting rid of hashes in generated filenames
	filenameHashing: false,
	build: {
		// cssMinify: false, // disable CSS mininfy only
		// minify: false, // disable CSS/JS mininfy only
		// change output location
		rollupOptions: {
			output: {
				manualChunks: undefined,
				assetFileNames: "assets/[name].[ext]", // Output assets (e.g., images, SVGs) to the assets folder
				entryFileNames: "assets/[name].js", // Output entry files (e.g., JavaScript) to the root directory
				chunkFileNames: "assets/[name].[ext]", // Output dynamic imports (chunks) to the assets folder
			},
		},
	},

	server: {
		// open the server with google chrome browser
		open: (process.env.BROWSER = "E:\\Apps\\scoop\\apps\\googlechrome-dev\\current\\chrome.exe"),
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"~gerillass": resolve(__dirname, "node_modules/gerillass/scss/gerillass.scss"),
		},
	},
	plugins: [],
}));
