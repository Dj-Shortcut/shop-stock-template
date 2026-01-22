import { prisma } from "../src/prisma/client";

export async function seedProductWithStock(stock: number) {
  const location = await prisma.location.create({
    data: { name: "Main Store" },
  });

  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      sku: `SKU-${Date.now()}`,
      priceCents: 1000,
    },
  });

  if (stock !== 0) {
    await prisma.stockMovement.create({
      data: {
        productId: product.id,
        locationId: location.id,
        delta: stock,
      },
    });
  }

  return { product, location };
}
