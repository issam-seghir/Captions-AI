import cssnano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";

export default {
	plugins: [
		// cssnano({
		// 	preset: "default",
		// }),
		postcssPresetEnv({ stage: 1 }),
	],
};
