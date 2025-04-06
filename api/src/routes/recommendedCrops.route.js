import express from "express";
import { getRecomendedCrops } from "../controllers/recommendedCrops.controller.js";

const router = express.Router();


router.get("/:state/:district", getRecomendedCrops);

export default router;