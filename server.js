import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", supplierRoutes);
app.use("/", inventoryRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});