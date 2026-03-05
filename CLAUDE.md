# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IT Specialists Salary Data — a full-stack app collecting and visualizing IT salary data in Uzbekistan. Monorepo with separate `client/` (Next.js) and `server/` (Express) folders.

## Commands

### Client (`cd client`)
```bash
npm run dev        # Next.js dev server with Turbopack (port 3000)
npm run build      # Production build
npm run lint       # ESLint with auto-fix
```

### Server (`cd server`)
```bash
npm run dev        # nodemon + ts-node dev server (port 5000)
npm run seed       # Seed the database: ts-node ./src/seed/seed.ts
```

### Database (run from `server/`)
```bash
npx drizzle-kit generate   # Generate migrations from model files
npx drizzle-kit migrate    # Apply migrations
npx drizzle-kit studio     # Open Drizzle Studio UI
```

## Environment Setup

**server/.env** (copy from `.env.example`):
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=your_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
```
Note: the schema uses `DB_NAME`, not `DB_DATABASE` (the `.env.example` says `DB_DATABASE` but the code reads `DB_NAME`).

**client/.env.local** (copy from `.env.example`):
```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_TOKEN=at
```

## Architecture

### Server (`server/src/`)
Express + TypeScript with a layered structure:
- `db/*.model.ts` — Drizzle ORM table definitions (one file per entity). Migrations are generated from `*.model.ts` glob pattern.
- `controllers/` — Request handlers (one class per entity, exported as singleton).
- `routes/` — Express routers that wire controllers to HTTP methods.
- `services/statistics.service.ts` — Heavy query logic for the statistics endpoint; builds dynamic WHERE clauses and runs parallel queries via `Promise.all`.
- `seed/` — Standalone seed scripts; run via `npm run seed`.

Entities: `user`, `city`, `position`, `company`, `location`, `experience`, `statistics`.

Auth: JWT issued on `/api/auth/login`, verified via Bearer token in subsequent requests. Tokens stored in cookies on the client side (cookie name configured via `NEXT_PUBLIC_TOKEN`).

### Client (`client/`)
Next.js 15 (App Router) + TypeScript + HeroUI + TailwindCSS:

**Route groups:**
- `app/(main)/` — Public-facing pages with Navbar/footer layout
  - `salary/` — Main salary stats page with filters and charts
  - `salary/survey/` — Salary submission form
  - `salary/history/` — User's submission history
  - `sign_in/`, `sign_up/` — Auth pages
- `app/admin/` — Admin panel (city, experience, position, user management), no auth guard in layout (client component)
- `app/page.tsx` — Root redirect

**Data fetching pattern:**
All API calls go through `utils/api/<entity>/`:
- `index.ts` — raw fetch function using the shared `http` axios instance
- `api.ts` — React Query hooks (`useQuery`/`useMutation`)
- `types.ts` — TypeScript types for that entity

The axios instance (`utils/config/axios.ts`) auto-attaches the JWT Bearer token from cookies and redirects to `/sign_in` on token errors.

**Client install note:** Use `--legacy-peer-deps` due to `@heroui/system` version conflict:
```bash
npm install --legacy-peer-deps
```
