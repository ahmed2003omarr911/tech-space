import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("MongoDB Connected!");
    // Seed the products to the database
    seedInitialProducts();
  })
  .catch((err) => console.log("Failed to connect!", err));

// Routes
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running successfully!" });
});

// For Vercel serverless function
if (process.env.VERCEL) {
  // Export for Vercel
  module.exports = app;
} else {
  // Start server for local development
  app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
  });
}

export default app;
