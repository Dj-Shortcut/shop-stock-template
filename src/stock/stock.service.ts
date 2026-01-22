import { prisma } from "../prisma/client";

/**
 * Read-only stock calculation
 */
export async function getStock(
  productId: string,
  locationId: string
): Promise<number> {
  const result = await prisma.stockMovement.aggregate({
    where: {
      productId,
      locationId,
    },
    _sum: {
      delta: true,
    },
  });

  return result._sum.delta ?? 0;
}

/**
 * Reserve stock atomically
 */
export async function reserveStock(
  productId: string,
  locationId: string,
  quantity: number
): Promise<void> {
  if (quantity <= 0) {
    throw new Error("INVALID_QUANTITY");
  }

  await prisma.$transaction(async (tx) => {
    const current = await tx.stockMovement.aggregate({
      where: {
        productId,
        locationId,
      },
      _sum: {
        delta: true,
      },
    });

    const available = current._sum.delta ?? 0;

    if (available < quantity) {
      throw new Error("NOT_ENOUGH_STOCK");
    }

    await tx.stockMovement.create({
      data: {
        productId,
        locationId,
        delta: -quantity,
      },
    });
  });
}
