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
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://kaees.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests that don't have an Origin header
      // such as Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked for origin: ${origin}`)
      );
    },
    credentials: true,
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

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