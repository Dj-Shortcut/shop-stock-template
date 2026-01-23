import { prisma } from "../db/client";


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
/**
 * Read-only stock calculation by SKU
 */
export async function getStockBySku(
  sku: string,
  locationId: string
): Promise<number> {
  const product = await prisma.product.findUnique({
    where: { sku },
    select: { id: true },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  return getStock(product.id, locationId);
}

/**
 * Reserve stock atomically by SKU
 */
export async function reserveStockBySku(
  sku: string,
  locationId: string,
  quantity: number
): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { sku },
    select: { id: true },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  await reserveStock(product.id, locationId, quantity);
}
/**
 * Release stock (undo reservation)
 */
export async function releaseStock(
  productId: string,
  locationId: string,
  quantity: number
): Promise<void> {
  if (quantity <= 0) {
    throw new Error("INVALID_QUANTITY");
  }

  await prisma.stockMovement.create({
    data: {
      productId,
      locationId,
      delta: quantity,
    },
  });
}

/**
 * Release stock by SKU
 */
export async function releaseStockBySku(
  sku: string,
  locationId: string,
  quantity: number
): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { sku },
    select: { id: true },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  await releaseStock(product.id, locationId, quantity);
}
