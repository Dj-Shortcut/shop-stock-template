# shop-stock-template

A **backend-only API** for reliable inventory and order handling, built with a
**movement-based stock model** to guarantee consistency under concurrent access.

> ⚠️ This repository contains a **backend-only service**.  
> It does **not** include a frontend or user interface by design.

---

## What this template provides

- Event-based stock system (no mutable stock counters)
- Safe stock reservations (race-condition protected)
- Transactional operations using database transactions
- SKU-based and UUID-based stock endpoints
- Prisma ORM with SQLite for local development and testing
- Zod validation for API inputs
- Jest test suite
- OpenAPI / Swagger documentation
- Clean, reusable project structure

---

## What this template does NOT include

- Frontend / UI
- Authentication or authorization
- Payments
- Deployment configuration
- Client-specific business logic

This repository is intended to be used as a **core backend service** that can be
extended or integrated into larger systems.

---

## Tech stack

- Node.js
- TypeScript
- Express v5 (intentional, future-proof)
- Prisma
- SQLite (development / tests)
- Zod
- Jest

---

## Architecture overview

The codebase follows a layered architecture:

- **Routes** — HTTP endpoints
- **Controllers** — request / response handling
- **Services** — business logic
- **Database** — Prisma ORM with SQLite

Stock is calculated as the **sum of stock movements**, ensuring:
- transactional safety
- auditability
- correct behaviour under concurrent access

---

## API Documentation (Swagger)

The API is fully documented using **OpenAPI (Swagger)**.

When running locally, the documentation is available at:
## License
This project is licensed under the MIT License. © 2026 [jouw naam]

