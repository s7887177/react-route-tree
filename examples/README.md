# React Route Tree Examples

This directory contains example applications demonstrating the usage of `@hdai-eason/react-route-tree`.

## Setup

1. **Install dependencies** (from the examples directory):
   ```bash
   npm install
   ```

2. **Build the parent library** (run from project root):
   ```bash
   cd ..
   npm run build
   ```

3. **Start the dev server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Examples Included

### 1. Basic Usage
Demonstrates how to create a RouteTree component and display different parts of your route hierarchy.

### 2. Filtering
Shows various filtering techniques:
- String prefix matching
- RegExp pattern matching
- Complex pattern examples

### 3. Expansion Levels
Illustrates how to control tree expansion depth:
- Setting default expansion at factory level
- Overriding expansion per component instance
- Priority of expansion settings

## Development Workflow

When making changes to the library:

1. Make your changes in `../src/`
2. Rebuild the library: `npm run build` (from project root)
3. The examples will automatically pick up the changes (HMR)

## Notes

- The examples app uses `"@hdai-eason/react-route-tree": "file:.."` to reference the parent package
- This means you must build the parent library before running examples
- The examples are for demonstration only and are not published to npm

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
