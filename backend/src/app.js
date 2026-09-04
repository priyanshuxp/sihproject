import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./controllers/routes.js";
import errorHandler from "./utils/errorHandler.js";
import { setupSwagger } from "./docs/swagger.js";
import config from "./config/env.js";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Setup Swagger API Documentation at /docs
setupSwagger(app);

// Mount API routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "SIH 26044 Backend Foundation API is running...",
    documentation: "/docs",
    health: "OK",
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
