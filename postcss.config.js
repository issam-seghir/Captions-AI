import postcssInlineSvg from "postcss-inline-svg";
import postcssPresetEnv from "postcss-preset-env";
import rfs from "rfs";
export default {
	plugins: [
		postcssInlineSvg(),
		rfs({
			baseValue: "1rem", // Default value: 1.25rem , If the font size which is passed to RFS is smaller than this value, no fluid rescaling will take place.
		}),
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
