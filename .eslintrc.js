module.exports = {
	env: {
		node: true,
		commonjs: true,
		es6: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-await-in-loop': 'warn',
		'no-cond-assign': 'error',
		'accessor-pairs': 'warn',
		eqeqeq: 'error',
		'no-eq-null': 'error',
		'no-void': 'error',
		strict: ['error', 'global'],
		'no-buffer-constructor': 'error',
		'no-new-require': 'error',
		'array-bracket-newline': ['error', 'never'],
		'comma-dangle': ['error', 'always'],
		'eol-last': ['error', 'always'],
		'func-call-spacing': ['error', 'never'],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		'line-comment-position': [
			'error',
			{
				position: 'above',
			},
		],
		'lines-between-class-members': ['error', 'always'],
		'new-cap': [
			'error',
			{
				newIsCap: true,
			},
		],
		'new-parens': ['error', 'always'],
		'newline-per-chained-call': 'error',
		'no-lonely-if': 'error',
		'no-multi-assign': 'error',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 3,
			},
		],
		'no-trailing-spaces': [
			'error',
			{
				ignoreComments: true,
			},
		],
		'quote-props': ['error', 'consistent'],
		'spaced-comment': ['error', 'always'],
		'arrow-body-style': ['error', 'always'],
		'no-var': 'error',
		'prefer-rest-params': 'error',
	},
}