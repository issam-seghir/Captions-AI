const { propertyGroups } = require("stylelint-config-clean-order");

const propertiesOrder = propertyGroups.map((properties) => ({
	noEmptyLineBetween: true,
	emptyLineBefore: "never", // Don't add empty lines between order groups.
	properties,
}));

module.exports = {
	extends: [
		// "stylelint-config-standard", // standard stylelint rules for css
		"stylelint-config-standard-scss", // for scss , this will use standard config too but for scss so you can delete the first line
		"stylelint-config-html",
		"stylelint-config-clean-order", // alternative : stylelint-config-recess-order / stylelint-config-property-sort-order-smacss
	],
	plugins: ["stylelint-high-performance-animation"],
	overrides: [
		{
			files: ["*.scss", "**/*.scss", "*.sass", "**/*.sass"],
			customSyntax: "postcss-scss",
		},
		{
			files: ["*.html", "**/*.html"],
			customSyntax: "postcss-html",
		},
		{
			files: ["*.md", "**/*.md"],
			customSyntax: "postcss-markdown",
		},
	],
	ignoreFiles: ["**/_reset.scss", "**/index.html", "**/LICENSE"],
	rules: {
		// Don't add empty lines between order groups.
		"order/properties-order": [
			propertiesOrder,
			{
				severity: "warning",
				unspecified: "bottomAlphabetical",
			},
		],

		//? for tailwind
		// "scss/at-rule-no-unknown": [
		// 	true,
		// 	{
		// 		ignoreAtRules: ["tailwind"],
		// 	},
		// ],

		// activate no-low-performance-animation
		"plugin/no-low-performance-animation-properties": true,
	},
	// lower the security level for all rule
	defaultSeverity: "warning",
	// Automatically fix, where possible, problems reported by rules.
	fix: true,
	//Store the results of processed files so that Stylelint only operates on the changed ones (improve speed & performance).
	cache: true,
};
