import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* =========================================================
   DATABASE
========================================================= */

connectDB();

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* =========================================================
   TEST ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KA Electrical backend is running",
  });
});

/* =========================================================
   PRODUCT ROUTES
========================================================= */

app.use("/api/products", productRoutes);

/* =========================================================
   CONTACT ROUTES
========================================================= */

app.use("/api/contact", contactRoutes);

/* =========================================================
   SERVER
========================================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`KA Electrical API running on port ${PORT}`);
});