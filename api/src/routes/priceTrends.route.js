import express from "express";
import cron from "node-cron";
import {
  createPriceTrends,
  getPriceTrends,
} from "../controllers/priceTrends.controller.js";

const router = express.Router();

router.get("/", getPriceTrends);
router.post("/", createPriceTrends);
cron.schedule("0 8 * * 1", createPriceTrends);

export default router;
