// -----------------------------
// 🔧 ESLint Config (React + TS + Prettier)
// -----------------------------

import js from '@eslint/js' // Reglas básicas recomendadas para JavaScript
import globals from 'globals' // Variables globales (como window, document, etc.)
import tseslint from 'typescript-eslint' // Soporte y reglas específicas para TypeScript
import reactPlugin from 'eslint-plugin-react' // Buenas prácticas para React
import reactHooks from 'eslint-plugin-react-hooks' // Valida el uso correcto de hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Evita errores con Vite + React Fast Refresh
import prettier from 'eslint-config-prettier' // Desactiva reglas que chocan con Prettier
import simpleImportSort from 'eslint-plugin-simple-import-sort' // Orden automático de imports
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // -----------------------------
  // 🚫 Ignorar carpetas generadas o no relevantes
  // -----------------------------
  globalIgnores(['dist', 'node_modules']),

  // -----------------------------
  // 📁 Configuración principal para TS y React
  // -----------------------------
  {
    files: ['**/*.{ts,tsx}'], // Aplica solo a archivos TypeScript y React

    // -----------------------------
    // 🧱 Configuraciones base y plugins
    // -----------------------------
    extends: [
      js.configs.recommended, // Buenas prácticas JS
      tseslint.configs.recommended, // Buenas prácticas TS
      reactPlugin.configs.flat.recommended, // Buenas prácticas React
      reactHooks.configs['recommended-latest'], // Uso correcto de hooks
      reactRefresh.configs.vite, // Integración con Vite + React Refresh
      prettier, // Compatibilidad con Prettier (formato)
    ],

    // -----------------------------
    // 🌍 Opciones del lenguaje
    // -----------------------------
    languageOptions: {
      ecmaVersion: 2020, // Soporta sintaxis moderna
      globals: globals.browser, // Permite usar objetos globales del navegador
      parserOptions: {
        project: true, // Usa la configuración de TS para detectar tipos
      },
    },

    // -----------------------------
    // 🔌 Plugins adicionales
    // -----------------------------
    plugins: {
      'simple-import-sort': simpleImportSort, // Orden automático de imports
    },

    // -----------------------------
    // ⚙️ Reglas personalizadas (puedes ajustarlas a tu gusto)
    // -----------------------------
    rules: {
      // === 💬 Estilo y limpieza general ===
      'no-unused-vars': 'warn', // Advierte sobre variables no usadas
      'no-console': 'warn', // Evita console.log en producción
      'prefer-const': 'error', // Prefiere const sobre let cuando sea posible
      eqeqeq: ['error', 'always'], // Obliga a usar === y !==
      'no-var': 'error', // Desactiva var por completo

      // === ⚛️ Reglas React ===
      'react/react-in-jsx-scope': 'off', // No hace falta importar React (React 17+)
      'react/jsx-uses-react': 'off', // Igual, innecesario con JSX moderno
      'react/jsx-key': 'error', // Obliga a usar key en listas JSX
      'react-hooks/rules-of-hooks': 'error', // Validación de uso correcto de hooks
      'react-hooks/exhaustive-deps': 'warn', // Avisa de dependencias faltantes en useEffect

      // === 🧠 TypeScript ===
      '@typescript-eslint/no-explicit-any': 'warn', // Advierte si usas any
      '@typescript-eslint/consistent-type-imports': 'error', // Prefiere importación de tipos con "import type"
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignora args con "_"

      // === 📦 Imports y orden ===
      'simple-import-sort/imports': 'error', // Ordena los imports automáticamente
    },
  },
])
