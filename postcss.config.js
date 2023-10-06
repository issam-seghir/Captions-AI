import postcssInlineSvg from "postcss-inline-svg";
import postcssPresetEnv from "postcss-preset-env";
import rfs from "rfs";
export default {
	plugins: [
		postcssInlineSvg(),
		rfs({
			baseValue: "1rem", // Default value: 1.25rem , If the font size which is passed to RFS is smaller than this value, no fluid rescaling will take place.
		}),
		postcssPresetEnv({ stage: 1, enableClientSidePolyfills :true}),
	],
};
