import express from "express";
import corsMiddleware from "./middleware/cors.js";
import dotenv from "dotenv";
import connectDB from "./config/databse.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

dotenv.config();
const PORT = process.env.PORT || 4000;


connectDB();
const app = express();
app.use(express.json());

app.use(corsMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
