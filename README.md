## MovieDeck

MovieDeck is a React + Vite single-page experience that lets you browse trending movies, explore upcoming releases, drill into metadata (cast, trailers, similar titles), and keep working searches all powered by The Movie Database (TMDb).

### Overview

- **Browse trends** – the dashboard surfaces trending, coming-soon, and genre-filtered collections.
- **Deep detail pages** – each movie and actor view fetches credits, videos, and recommendations via dedicated use cases.
- **Search-first flow** – a reusable search dropdown/controller drives instant suggestions and a search-results page with pagination-ready responses.

### Architecture & Patterns

1. **Clean core boundary.** `src/core` separates `domain`, `useCases`, and `infrastructure`. Use cases orchestrate business rules, repositories expose operations, and infrastructure packages DTOs + mappers that validate/respect the TMDb schema via `zod`.
2. **Dependency Injection via Awilix.** The `src/_di` container registers modules (core and shared) with `asFunction`, making repositories and use cases resolvable through `useInject` in UI controllers.
3. **Controller/presentational split.** Each high-level screen (Dashboard, SearchResults, MovieDetail, etc.) ships a `.controller.tsx` file that calls use cases, manages local state, and passes clean props into view components.
4. **Data mapping helpers.** Builders/mappers translate DTOs (`_dto/`) into domain value objects used across the app, keeping adapters focused on the remote API contract.
5. **Reusable hooks & components.** Shared hooks (like `useDebounce`) and atom/molecule components (buttons, icons, cards, carousels) live under `src/ui/_components`, promoting consistency.

### Key Libraries & Tooling

- **React 19 + Vite** – newest JSX runtime with SWC-backed tooling (`@vitejs/plugin-react-swc`).
- **Tailwind CSS 4 + @tailwindcss/vite** – utility-first styling, plus `MovieCarousel` CSS modules for targeted tweaks.
- **Awilix** – dependency injection container used by `container.ts`, `coreModules`, and `registerCoreModules` for singletons.
- **Axios + Zod** – `axios` drives HTTP, while `zod` schemas enforce payload shapes before mapping to domain objects.
- **Framer Motion + Lucide React + React Icons** – small animation and icon utilities that keep the UI expressive.
- **React Router 7** – defines routes for dashboards, genre views, search results, and detailed pages.
- **Testing** – `vitest`, `@testing-library/*`, `vitest-mock-extended`, and custom controller tests verify both logic and rendering.
- **Lint & format** – `eslint`, `@eslint/js`, `eslint-plugin-react`, and `prettier` keep code consistent.

### Getting started

1. Install dependencies with `yarn install`.
2. Create a `.env` at the repo root and set `VITE_API_KEY` to a TMDb API key.
3. Run `yarn dev` to start the Vite dev server.
4. `yarn build` compiles `tsc` + `vite build` for production artifacts.
5. `yarn preview` serves the production build locally for smoke checks.

### Testing & Quality

- `yarn test` runs the Vitest suite (controller and infrastructure tests).
- `yarn lint` ensures ESLint rules pass across the project.
- `yarn build` already runs TypeScript’s `tsc -b`, so it doubles as a type check.

### Folder highlights

- `src/core/Movies` – handles TMDb contracts via repositories, DTOs, mappers, and use cases (trending, by-id, search, genres, credits, videos, people).
- `src/core/Shared` – central API client builders for reuse.
- `src/ui` – structured by feature with controller/view pairs, shared atoms/molecules, and hooks.
- `src/_di` – central container, resolvers, and module registration that bootstrap the clean architecture.

With these layers, MovieDeck stays testable, resilient to API changes, and easy to extend with new TMDb-backed features.
