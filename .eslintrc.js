module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		"no-console": "warn",
		"indent": ["error", "tab"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"eqeqeq": ["error", "always"],
		"curly": ["error", "all"],
	},
};
