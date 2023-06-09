module.exports = {
	ignorePatterns: ['**/dist/*.js'],
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jest: true
	},
	extends: ['eslint:recommended', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {}
};
