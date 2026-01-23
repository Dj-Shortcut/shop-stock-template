import express from "express";
import stockRoutes from "./stock/stock.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

export const app = express();

app.use(express.json());

// API routes
app.use("/stock", stockRoutes);

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/", (_, res) => {
  res.send("Shop Stock API running");
});
