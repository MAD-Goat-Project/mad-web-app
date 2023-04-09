module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // TODO: Activate propTypes validation
    //  "react/proptypes": 2,
    'react/react-in-jsx-scope': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
