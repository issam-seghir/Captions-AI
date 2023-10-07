module.exports = {
	// Specify the environments where your code will run
	env: {
		browser: true,
		es2023: true,
	},
	// Extend configurations from various ESLint plugins
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:jsonc/base", // or use jsonc/recommended-with-(json/jsonc/json5/prettier )
		"plugin:security/recommended",
		"plugin:unicorn/recommended",
		"plugin:sonarjs/recommended",
		"plugin:compat/recommended", // see browse list in package.json
		"prettier", // Make sure this is the last,
	],
	plugins: ["html", "import", "simple-import-sort", "unicorn", "sonarjs"],
	// Configure settings for certain plugins
	settings: {
		"import/docstyle": ["jsdoc", "tomdoc"],
		// compat plugin : polyfills web api
		polyfills: [
			// Example of marking entire API and all methods and properties as polyfilled
			"Promise",
			// Example of marking specific method of an API as polyfilled
			"WebAssembly.compile",
			// Example of API with no property (i.e. a function)
			"fetch",
			// Example of instance method, must add `.prototype.`
			"Array.prototype.push",
		],
	},

	overrides: [
		{
			files: [".eslintrc.{js,cjs}"],
			env: {
				node: true,
			},
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	ignorePatterns: ["**/node_modules/", "**/build/", "**/dist/", "**/.vscode/", "**/.idea/", "**/.git/", "**/coverage/", "**/.cache/", "**/__tests__/", "**/*.config.cjs", "**/*.config.mjs", "**/*.config.js", "**/*.config.ts", "**/*.test.js", "**/*.test.ts", "**/*.spec.js", "**/*.spec.ts"],
	rules: {
		// Organize imports using simple-import-sort
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",

		// Ensure imports are at the beginning of the file
		"import/first": "error",
		// Require a newline after import statements
		"import/newline-after-import": "error",
		// Prevent duplicate imports
		"import/no-duplicates": "error",
		// Allow empty named blocks in imports (with a warning)
		"import/no-empty-named-blocks": "warn",

		// disables the default e -> event / error
		// add custom abbreviations err -> error
		"unicorn/prevent-abbreviations": [
			"error",
			{
				checkFilenames: false,
				replacements: {
					e: false,
					err: {
						error: true,
					},
				},
			},
		],
		// "unicorn/prevent-abbreviations": [
		// 	"error",
		// 	{
		// 		allowList: { Param: true, Req: true, Res: true },
		// 	},
		// ],
		"unicorn/no-array-reduce": "off",
		"unicorn/no-array-for-each": "off",
		"unicorn/filename-case": ["off"],
	},
};
