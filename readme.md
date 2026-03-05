# IT Salary — Uzbekistan

An open-source platform for collecting and visualizing salary data of IT specialists in Uzbekistan. The goal is to give developers, employers, and the community a transparent, community-driven picture of what IT professionals actually earn across different cities, roles, and experience levels in the country.

> Built by the community, for the community. All data is submitted anonymously by IT professionals themselves.

## Why this exists

Salary data in Uzbekistan's IT market is largely opaque. Job postings rarely list salaries, and there's no reliable public source to benchmark compensation. This project aims to change that — by aggregating self-reported salary data and making the trends visible to everyone.

## What it does

- **Anonymous salary submissions** — anyone can submit their salary, position, city, company, and experience level
- **Interactive charts** — salary distributions broken down by role, experience, location, and company
- **Filters** — compare salaries across any combination of dimensions
- **Submission history** — registered users can view and manage their own submissions
- **Admin panel** — manage reference data (cities, positions, companies, experience levels)

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, HeroUI, TailwindCSS, Recharts |
| Backend | Express, TypeScript, Drizzle ORM |
| Database | PostgreSQL |
| Auth | JWT (HTTP-only cookies) |

## Contributing

Contributions are welcome. If you want to add a feature, fix a bug, or improve the data model:

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

Please open an issue first for significant changes so we can discuss the approach.

## License

This project is licensed under the [GNU General Public License v3.0](./LICENSE).

---

## Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/) 14+

### 1. Clone the repository

```bash
git clone https://github.com/bekforever/it-salary.git
cd it-salary
```

### 2. Configure environment variables

**Server** (`server/.env`):
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=it_salary
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
```

**Client** (`client/.env.local`):
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_TOKEN=at
```

### 3. Create the database

```bash
psql -U postgres -c "CREATE DATABASE it_salary;"
```

### 4. Install dependencies

```bash
cd server && pnpm install
cd ../client && pnpm install
```

### 5. Run migrations and seed

```bash
cd server
npx drizzle-kit migrate
pnpm run seed
```

### 6. Start the development servers

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server && pnpm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd client && pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Default accounts (after seed)

| Email | Password | Role |
|---|---|---|
| admin@admin.com | password123 | admin |
| user1@user.com | password123 | user |
