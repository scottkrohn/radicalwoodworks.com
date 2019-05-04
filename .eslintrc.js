module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["react"],
	parser: "babel-eslint",
	rules: {
		"react/prop-types": [1],
		"comma-dangle": ["warn", "always-multiline"],
		"indent": ["warn", "tab"],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"no-console": ["warn"],
		"no-unused-vars": ["warn"],
	},
};
