import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import productsRouter from "./routes/products";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/kcpl";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

/* ------------------------------------------------------------------ */
/*  Middleware                                                           */
/* ------------------------------------------------------------------ */
app.use(
  cors({
    origin: [FRONTEND_ORIGIN, "http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

/* ------------------------------------------------------------------ */
/*  Health check                                                         */
/* ------------------------------------------------------------------ */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ------------------------------------------------------------------ */
/*  Routes                                                               */
/* ------------------------------------------------------------------ */
app.use("/api/products", productsRouter);

/* ------------------------------------------------------------------ */
/*  Error handler (must be last)                                         */
/* ------------------------------------------------------------------ */
app.use(errorHandler);

/* ------------------------------------------------------------------ */
/*  Bootstrap                                                            */
/* ------------------------------------------------------------------ */
connectDB(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Listening on http://localhost:${PORT}`);
  });
});
