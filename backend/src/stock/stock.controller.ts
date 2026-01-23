import { Request, Response } from "express";
import {
  getStock,
  reserveStock,
  getStockBySku,
  reserveStockBySku,
} from "./stock.service";
import {
  getStockQuerySchema,
  reserveStockBodySchema,
  getStockBySkuParamsSchema,
  reserveStockBySkuBodySchema,
} from "./validation/stock.schemas";

/**
 * GET /stock/:productId?locationId=...
 */
export async function getStockHandler(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const query = getStockQuerySchema.parse(req.query);

    const stock = await getStock(productId, query.locationId);
    return res.json({ stock });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid query parameters" });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to fetch stock" });
  }
}

/**
 * POST /stock/reserve
 */
export async function reserveStockHandler(req: Request, res: Response) {
  try {
    const body = reserveStockBodySchema.parse(req.body);

    await reserveStock(
      body.productId,
      body.locationId,
      body.quantity
    );

    return res.status(201).json({ message: "Stock reserved" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    if (error instanceof Error && error.message === "INVALID_QUANTITY") {
      return res.status(400).json({
        message: "Quantity must be greater than zero",
      });
    }

    if (error instanceof Error && error.message === "NOT_ENOUGH_STOCK") {
      return res.status(409).json({
        message: "Not enough stock available",
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to reserve stock" });
  }
}

/**
 * GET /stock/sku/:sku?locationId=...
 */
export async function getStockBySkuHandler(req: Request, res: Response) {
  try {
    const params = getStockBySkuParamsSchema.parse(req.params);
    const query = getStockQuerySchema.parse(req.query);

    const stock = await getStockBySku(params.sku, query.locationId);
    return res.json({ stock });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to fetch stock" });
  }
}

/**
 * POST /stock/sku/reserve
 */
export async function reserveStockBySkuHandler(req: Request, res: Response) {
  try {
    const body = reserveStockBySkuBodySchema.parse(req.body);

    await reserveStockBySku(
      body.sku,
      body.locationId,
      body.quantity
    );

    return res.status(201).json({ message: "Stock reserved" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({ message: "Invalid request body" });
    }

    if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    if (error instanceof Error && error.message === "NOT_ENOUGH_STOCK") {
      return res.status(409).json({ message: "Not enough stock available" });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to reserve stock" });
  }
}
