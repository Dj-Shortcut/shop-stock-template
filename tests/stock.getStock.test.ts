import { getStock } from "../src/stock/stock.service";
import { seedProductWithStock } from "./helpers";

test("getStock returns correct stock", async () => {
  const { product, location } = await seedProductWithStock(10);

  const stock = await getStock(product.id, location.id);

  expect(stock).toBe(10);
});

