import request from "supertest";
import { app } from "../src/app";
import { prisma } from "../src/db/client";

describe("Stock API (SKU)", () => {
  let productSku: string;
  let locationId: string;

  beforeEach(async () => {
    // Clean DB
    await prisma.stockMovement.deleteMany();
    await prisma.product.deleteMany();
    await prisma.location.deleteMany();

    // Seed location
    const location = await prisma.location.create({
      data: { name: "Main Store" },
    });
    locationId = location.id;

    // Seed product
    const product = await prisma.product.create({
      data: {
        name: "Test Product",
        sku: `SKU-${Date.now()}`,
        priceCents: 1000,
      },
    });
    productSku = product.sku;

    // Seed stock (+5)
    await prisma.stockMovement.create({
      data: {
        productId: product.id,
        locationId,
        delta: 5,
      },
    });
  });

  it("GET /stock/sku/:sku returns stock", async () => {
    const res = await request(app)
      .get(`/stock/sku/${productSku}`)
      .query({ locationId });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ stock: 5 });
  });

  it("POST /stock/sku/reserve reserves stock", async () => {
    const reserveRes = await request(app)
      .post("/stock/sku/reserve")
      .send({
        sku: productSku,
        locationId,
        quantity: 2,
      });

    expect(reserveRes.status).toBe(201);
    expect(reserveRes.body).toEqual({ message: "Stock reserved" });

    // Check stock after reservation
    const stockRes = await request(app)
      .get(`/stock/sku/${productSku}`)
      .query({ locationId });

    expect(stockRes.status).toBe(200);
    expect(stockRes.body).toEqual({ stock: 3 });
  });
});
