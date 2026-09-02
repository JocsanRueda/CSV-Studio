# CSV Studio (React + TypeScript)

Migración en progreso de CSV Studio (vanilla JS + CDN) a React 19 + TypeScript + Vite + Tailwind CSS v4, manteniendo el 100% de la funcionalidad original.

## Estado actual

- ✅ Lógica de negocio migrada y tipada: limpieza de CSV, manejo de archivos, tema, efecto de cursor.
- ✅ UI componentizada (sin componentes monolíticos, sin prop-drilling de textos).
- ✅ Dependencias reales: `papaparse` y `jszip` vía npm (nada de `<script>` por CDN).
- ✅ Diseño modernizado (paleta neutra, radios y sombras estilo shadcn) conservando los efectos de gradiente originales (glow del cursor, línea superior, botón principal).
- ✅ `strict: true` habilitado en TypeScript.
- ⬜ Pendiente: pruebas automatizadas (Vitest) y reemplazo definitivo del proyecto vanilla en la raíz del repo.

## Funciones

- Elimina columnas cuyo encabezado comienza con `px`.
- Elimina opcionalmente `pyGUID`, `pyLabel` y `pyBoolFlag` (activables/desactivables desde la UI).
- Conserva el delimitador y el salto de línea detectados en el CSV original.
- Elimina timestamps tipo `20260812T215952.873 GMT` del nombre de salida.
- Descarga un CSV único o un ZIP cuando se procesan varios archivos.
- Todo el procesamiento ocurre en el navegador; no se envían archivos a un servidor.

## Requisitos

- Node.js 18+
- [pnpm](https://pnpm.io/) (gestor de paquetes usado en este proyecto)

## Comandos

```bash
pnpm install       # instalar dependencias
pnpm dev           # servidor de desarrollo con HMR
pnpm build         # type-check (tsc -b) + build de producción
pnpm preview       # previsualizar el build de producción
pnpm lint          # ESLint
```

## Estructura

```
src/
  config.ts               # textos (TEXTS) y ajustes (SETTINGS), tipados
  lib/
    csv.ts                 # parseo y limpieza de CSV (Papa Parse)
    files.ts                # dedupe, formato de bytes, descarga de blobs
  hooks/
    useCsvCleaner.ts        # estado y flujo principal (archivos, progreso, resultado)
    useTheme.ts              # tema claro/oscuro persistido en localStorage
    useCursorGlow.ts         # efecto de glow que sigue al cursor
  components/
    Header.tsx, HeroIntro.tsx, Dropzone.tsx, OptionalColumnsPanel.tsx,
    ActionButtons.tsx, FileList.tsx, FileItem.tsx, EmptyState.tsx,
    SummaryBox.tsx, CleanerPanel.tsx, FilesPanel.tsx, BackgroundEffects.tsx
  App.tsx                  # raíz de composición
```

`TEXTS` y `SETTINGS` se importan directamente donde se necesitan (no se pasan como props) porque son constantes estáticas sin selector de idioma dinámico.

---

## Notas de la plantilla base (Vite + React + TS)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

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

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

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
