module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config', 'plugin:tailwindcss/recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/order-in-components': 'error',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/require-default-prop': 'off',
    'vue/padding-line-between-blocks': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'always',
          void: 'always',
        },
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
      },
    ],
  },
};
