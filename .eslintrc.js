module.exports = {
  extends: ['plugin:prettier/recommended', require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        semi: true,
        trailingComma: 'all',
        tabWidth: 2,
      },
    ],
    'no-console': `off`,
    'react-hooks/rules-of-hooks': `warn`,
    'react-hooks/exhaustive-deps': `off`,
    'import/no-commonjs': 'off',
  },
};
