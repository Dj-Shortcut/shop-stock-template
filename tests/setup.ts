import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

import { prisma } from "../src/prisma/client";

beforeEach(async () => {
  // Eerst ALLE children (FK-afhankelijk)
  await prisma.stockMovement.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  // Dan parents
  await prisma.product.deleteMany();
  await prisma.location.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
