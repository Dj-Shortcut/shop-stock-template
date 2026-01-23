import { Router } from "express";
import {
  getStockHandler,
  reserveStockHandler,
  getStockBySkuHandler,
  reserveStockBySkuHandler,
} from "./stock.controller";

const router = Router();

/**
 * @openapi
 * /stock/{productId}:
 *   get:
 *     summary: Get stock by product ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Current stock
 */
router.get("/:productId", getStockHandler);

/**
 * @openapi
 * /stock/reserve:
 *   post:
 *     summary: Reserve stock by product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - locationId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               locationId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Stock reserved
 */
router.post("/reserve", reserveStockHandler);

/**
 * @openapi
 * /stock/sku/{sku}:
 *   get:
 *     summary: Get stock by SKU
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Current stock
 */
router.get("/sku/:sku", getStockBySkuHandler);

/**
 * @openapi
 * /stock/sku/reserve:
 *   post:
 *     summary: Reserve stock by SKU
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sku
 *               - locationId
 *               - quantity
 *             properties:
 *               sku:
 *                 type: string
 *               locationId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Stock reserved
 */
router.post("/sku/reserve", reserveStockBySkuHandler);

export default router;
