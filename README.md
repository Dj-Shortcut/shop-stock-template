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
```
---

<!--## Example case: Classical menswear store

This template was designed with stores in mind where:
- stock levels are low
- item value is high
- mistakes are expensive

### Context
A classical menswear store selling:
- tailored suits
- dress shirts
- shoes
- accessories

Products are sold both:
- in-store (fitting & advice)
- online (reservation or purchase)

### The problem
In many systems, stock is tracked as a simple number.
This often leads to issues such as:
- double-selling the last available item
- inconsistent stock between webshop and store
- manual fixes after mistakes

### Real-world scenario
There is exactly **1 navy suit, size 50** in stock.

Two customers attempt to reserve it almost simultaneously:
- one in-store
- one online

In this system:
- only one reservation succeeds
- the second attempt fails immediately
- stock remains correct at all times

### Why this matters
For stores where trust and quality matter, reliability is more important than speed.
This template ensures that stock is always consistent, even under concurrent access.

### Reusability
While this example focuses on menswear, the same approach applies to:
- sneaker stores
- jewelers
- limited edition drops
- rental or reservation-based businesses
-->
