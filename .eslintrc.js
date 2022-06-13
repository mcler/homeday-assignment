/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    'root': true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
    ],
    'env': {
        'vue/setup-compiler-macros': true,
    },
    'rules': {
        'comma-dangle': ['error', 'always-multiline'],
        'consistent-return': 'error',
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1,
            },
        ],
        'semi': ['error', 'never'],
        'quotes': [
            'error',
            'single',
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': [],
            },
        ],
        'vue/no-deprecated-destroyed-lifecycle': 0,
    },
}
