import fontMagician from "postcss-font-magician";
import postcssInlineSvg from "postcss-inline-svg";
import postcssPresetEnv from "postcss-preset-env";
import rfs from "rfs";
export default {
	plugins: [
		fontMagician(),
		postcssInlineSvg(),
		rfs({}),
		// cssnano({
		// 	preset: "default",
		// }),
		/* 		.
		..(process.env.NODE_ENV.trim() === "production" ? { cssnano: {} } : {}),
		...(process.env.NODE_ENV.trim() === "production" ? [cssnano({ preset: "default" })] : []),
		in the script area :
		"scripts": {
  		"dev": "vite",
  		"build": "$env:NODE_ENV='production'&& vite build",
  		"build:watch": "$env:NODE_ENV='build'&& vite build --watch"
		}

		*/
		postcssPresetEnv({ stage: 1 }),
	],
};
