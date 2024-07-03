import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { jihyunlabEslintConfig } from '@jihyunlab/eslint-config';

export default tsEslint.config(
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommendedTypeChecked,
      jihyunlabEslintConfig,
      eslintPluginPrettierRecommended,
    ],
  }
);
