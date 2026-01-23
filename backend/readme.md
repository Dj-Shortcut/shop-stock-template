# Backend

Backend API for the Shop Stock Template.

This service manages **product stock per location** using a
**movement-based stock model** (no mutable counters).

---

## Tech Stack

- Node.js
- TypeScript
- Express v5 (intentional, future-proof)
- Prisma
- SQLite (dev/test)
- Jest

---

## Architecture overview

- **Routes**: HTTP endpoints
- **Controllers**: request/response handling
- **Services**: business logic
- **Database**: Prisma ORM with SQLite

Stock is calculated as the **sum of stock movements**, ensuring:
- transaction safety
- auditability
- correct concurrent behaviour

---

## Setup

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma generate
npm run dev

```
## Design Decisions

Key architectural and technical decisions are documented here:

- [Design Decisions](./docs/decisions.md)
