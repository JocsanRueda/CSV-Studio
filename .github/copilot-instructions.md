# CSV Studio project instructions

## Build, test, and lint

- Use Node.js 18+ and pnpm, as documented in [README.md](../README.md).
- `pnpm install` installs dependencies.
- `pnpm dev` starts the Vite development server; `pnpm preview` serves a production build locally.
- `pnpm build` runs the TypeScript project build (`tsc -b`) and creates the Vite production build.
- `pnpm lint` runs ESLint across the repository.
- There is no automated test script or configured test runner yet; the README lists automated tests as pending, so there is no single-test command.

## Architecture

- This is a browser-only React 19 + TypeScript application built with Vite. CSV files are processed locally; there is no server-side upload or processing path.
- [src/App.tsx](../src/App.tsx) composes the page, theme/cursor hooks, and the CSV cleaner workflow. The UI is split into focused components under `src/components/`; stateful workflows live in `src/hooks/`.
- [src/hooks/useCsvCleaner.ts](../src/hooks/useCsvCleaner.ts) owns selected-file state, per-file progress, optional-column choices, cleaning, summaries, and downloads. It delegates parsing/cleaning to `src/lib/csv.ts` and file filtering/naming/download helpers to `src/lib/files.ts`.
- A single successful file is downloaded as a CSV; multiple successful files are packaged into a ZIP. Failed files are summarized without preventing other files from being processed.
- Static copy and cleaner settings are defined in `src/config.ts`. Components and helpers import `TEXTS`/`SETTINGS` directly; there is no dynamic locale selection or need to thread these constants through props.
- Tailwind CSS v4 is integrated through the Vite plugin and imported in `src/index.css`. The `.dark` class is applied before React starts in `index.html`; `useTheme` keeps it and `localStorage` in sync.

## Project-specific conventions

- Keep CSV transformation logic in `src/lib/csv.ts`, separate from React. It uses Papa Parse, retains the detected delimiter and original newline style, normalizes headers for case-insensitive matching, and derives the cleaned output name.
- The `px` header prefix is always removed. Exact optional columns (`pyGUID`, `pyLabel`, and `pyBoolFlag`) are configured in `SETTINGS` and enabled by default; keep configuration and UI choices aligned.
- Preserve the existing clean-flow contract: file selection accepts CSVs and deduplicates by name, size, and last-modified time; output filename collisions receive numbered suffixes; one output uses a CSV download and multiple outputs use `TEXTS.zipName`.
- Keep React components focused on presentation and pass changing state/actions through typed props. Put shared/static text and behavior settings in `src/config.ts`, not in component props solely for forwarding.
- TypeScript is strict (`tsconfig.app.json`); use explicit types for component props and exported data shapes, and use type-only imports where appropriate.
