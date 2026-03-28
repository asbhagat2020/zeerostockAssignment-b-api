import express from "express";
import { createSupplier } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/supplier", createSupplier);

export default router;