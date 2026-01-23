import { reserveStock, getStock } from "../src/stock/stock.service";
import { seedProductWithStock } from "./helpers";

test("reserveStock reduces stock when enough stock exists", async () => {
  const { product, location } = await seedProductWithStock(10);

  await reserveStock(product.id, location.id, 4);

  const stock = await getStock(product.id, location.id);
  expect(stock).toBe(6);
});
