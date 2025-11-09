import express from "express";
import { fetchSeries, agregarSerie } from "../controllers/series.controller.js";

export const router = express.Router();

router.get("/", fetchSeries);
router.post("/", agregarSerie);
