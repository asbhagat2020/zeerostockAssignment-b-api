import express from "express";
import {
  createInventory,
  getInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/inventory", createInventory);
router.get("/inventory", getInventory);

export default router;