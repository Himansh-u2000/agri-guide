import express from "express";
import {
  getDistrict,
  getPriceTrends,
  getState
} from "../controllers/priceTrends.controller.js";

const router = express.Router();

router.get("/", getPriceTrends);
router.get("/state", getState);
router.get("/district/:state", getDistrict);

export default router;
