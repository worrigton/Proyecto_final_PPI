const config = {
	extends : [
		"eslint:recommended",
		"plugin:react/recommended",
	],
	env : {
		node    : true,
		browser : true,
	},
	parserOptions : {
		ecmaFeatures : {
			jsx : true,
		},
	},
	plugins : [
		"react",
		"import",
		"react-hooks",
	],
	parser : "babel-eslint",
	rules  : {
		"max-len" : [
			"error",
			{
				code       : 120,
				tabWidth   : 4,
				ignoreUrls : true,
			},
		],
		indent : [
			"error",
			"tab",
			{
				SwitchCase : 1,
				// Comment next line when problem is fixed
				ignoredNodes : ["TemplateLiteral"],
			},
		],
		"no-mixed-spaces-and-tabs" : [
			"error",
			"smart-tabs",
		],
		"linebreak-style" : [
			"off",
			"windows",
		],
		quotes : [
			"error",
			"double",
		],
		semi : [
			"error",
			"always",
		],
		"no-unused-vars" : [
			"error",
			{
				args : "none",
			},
		],
		"space-before-function-paren" : [
			"error",
			{
				anonymous  : "never",
				named      : "never",
				asyncArrow : "always",
			},
		],
		"comma-dangle" : [
			"error",
			{
				arrays    : "always-multiline",
				objects   : "always-multiline",
				imports   : "always-multiline",
				exports   : "always-multiline",
				functions : "ignore",
			},
		],
		"key-spacing" : [
			"error",
			{
				singleLine : {
					beforeColon : true,
					afterColon  : true,
				},
				multiLine : {
					align       : "colon",
					beforeColon : true,
					afterColon  : true,
				},
			},
		],
		"no-trailing-spaces" : "error",
		"eol-last"           : [
			"error",
			"always",
		],
		"space-infix-ops" : [
			"error",
			{
				int32Hint : false,
			},
		],
		"keyword-spacing"     : "error",
		"space-before-blocks" : "error",
		"comma-spacing"       : [
			"error",
			{
				before : false,
				after  : true,
			},
		],
		"no-var"          : "error",
		"prefer-const"    : "error",
		"no-const-assign" : "error",
		"no-cond-assign"  : [
			"error",
			"except-parens",
		],
		"no-useless-concat"      : "error",
		"prefer-template"        : "error",
		"template-curly-spacing" : "off",
		// "template-curly-spacing" : [
		// 	"error",
		// 	"always",
		// ],
		"object-curly-spacing"   : [
			"error",
			"always",
		],
		"arrow-body-style" : [
			"error",
			"as-needed",
		],
		"no-loop-func" : "error",
		"camelcase"    : "error",
		"no-console"   : [
			"error",
			{
				allow : [
					"warn",
					"error",
					"info",
				],
			},
		],
		// React rules
		"react/react-in-jsx-scope" : "off",
		"import/extensions"        : [
			"error",
			{
				jsx : "always",
				js  : "never",
				png : "always",
				jpg : "always",
				svg : "always",
			},
		],
		"import/no-extraneous-dependencies" : [
			"error",
			{
				devDependencies : true,
			},
		],
		"react/jsx-indent" : [
			1,
			"tab",
		],
		"react/jsx-indent-props" : [
			1,
			"tab",
		],
		"react/jsx-uses-react"    : "error",
		"react/jsx-uses-vars"     : "error",
		"react/jsx-curly-spacing" : [
			"error",
			{
				when     : "never",
			},
		],
		"react/jsx-curly-newline" : [
			"error",
			{
				multiline  : "consistent",
				singleline : "consistent",
			},
		],
		"react/jsx-child-element-spacing" : "error",
		"react/display-name"              : "off",
		"react-hooks/rules-of-hooks"      : "error",
		"react-hooks/exhaustive-deps"     : "error",
		"react/jsx-props-no-multi-spaces" : "error",
		"react/self-closing-comp"         : "error",
		"react/jsx-tag-spacing"           : [
			"error",
			{
				closingSlash      : "never",
				beforeSelfClosing : "always",
				afterOpening      : "never",
				beforeClosing     : "never",
			},
		],
	},
	settings : {
		react : {
			version : "detect",
		},
	},
};

module.exports = config;
