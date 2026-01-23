import { z } from "zod";

/**
 * Shared
 */
export const getStockQuerySchema = z.object({
  locationId: z.string().uuid(),
});

/**
 * UUID-based
 */
export const reserveStockBodySchema = z.object({
  productId: z.string().uuid(),
  locationId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const releaseStockBodySchema = z.object({
  productId: z.string().uuid(),
  locationId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

/**
 * SKU-based
 */
export const getStockBySkuParamsSchema = z.object({
  sku: z.string().min(1),
});

export const reserveStockBySkuBodySchema = z.object({
  sku: z.string().min(1),
  locationId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const releaseStockBySkuBodySchema = z.object({
  sku: z.string().min(1),
  locationId: z.string().uuid(),
  quantity: z.number().int().positive(),
});
