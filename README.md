# shop-stock-template

A reusable backend core for inventory and order handling.

## What this template provides
- Event-based stock system (no direct stock counters)
- Safe stock reservations (race-condition protected)
- Transactional operations
- Prisma ORM with SQLite for local use
- Jest test suite
- Clean, reusable project structure

## What this template does NOT include
- Frontend / UI
- Payments
- Authentication
- Deployment setup
- Client-specific logic

## Tech stack
- Node.js
- TypeScript
- Prisma
- SQLite (local / tests)
- Jest

## Getting started

```bash
npm install
npx prisma generate
npx prisma db push
npx jest
