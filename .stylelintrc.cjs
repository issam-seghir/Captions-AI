const { propertyGroups } = require("stylelint-config-clean-order");

const propertiesOrder = propertyGroups.map((properties) => ({
	noEmptyLineBetween: true,
	emptyLineBefore: "never", // Don't add empty lines between order groups.
	properties,
}));

module.exports = {
	// Specify your Stylelint rules and configurations here

	// Use Prettier for consistent code formatting
	extends: [
		// "stylelint-config-standard", // standard stylelint rules for css
		"stylelint-config-standard-scss", // for scss , this will use standard config too but for scss so you can delete the first line
		"stylelint-config-html",
		"stylelint-config-clean-order", // alternative : stylelint-config-recess-order / stylelint-config-property-sort-order-smacss
	],
	plugins: ["stylelint-selector-bem-pattern", "stylelint-high-performance-animation"],
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
	ignoreFiles: ["**/_reset.scss", "**/index.html"],
	rules: {
		// Don't add empty lines between order groups.
		"order/properties-order": [
			propertiesOrder,
			{
				severity: "warning",
				unspecified: "bottomAlphabetical",
			},
		],

		// for tailwind
		// "scss/at-rule-no-unknown": [
		// 	true,
		// 	{
		// 		ignoreAtRules: ["tailwind"],
		// 	},
		// ],

		// Configure the BEM rule
		"plugin/selector-bem-pattern": {
			// Specify the naming convention (BEM or any other)
			preset: "bem",
			// Customize the component, element, and utility selector patterns
			componentName: "[A-Z]+",
			componentSelectors: {
				initial: "^\\.{componentName}(?:-[a-z]+)?$",
				combined: "^\\.combined-{componentName}-[a-z]+$",
			},
			implicitComponents: ["components/**/*.css", "others/**/*.css"], //Enable Components pattern  for specific files
			ignoreSelectors: ["^.no-.+$", "^.isok-.+$"],
			utilitySelectors: "^\\.[a-z]+__[a-z]+(-[a-z]+)?$",
			implicitUtilities: ["**/*.scss", "**/*.css"], //Enable Utilities pattern  for specific files

			// implicitComponents: true , Enable Components pattern for all files
			// implicitUtilities: true , Enable Utilities pattern  for all files
			//? or use comments in specific files :
			//* /** @define utilities */ ...... /** @end */ : Enable Utilities pattern
			//* /** @define ComponentName  */ ...... /** @end */: Enable Components pattern
		},

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
