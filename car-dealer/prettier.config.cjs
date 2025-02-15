/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	printWidth: 120,
	tabWidth: 2,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'es5',
	bracketSpacing: true,
	arrowParens: 'always',
};

module.exports = config;
