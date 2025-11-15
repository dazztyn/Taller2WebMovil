import express from "express";
import { fetchSeries, cargarSeriesJson } from "../src/controllers/series.controller.js";

export const router = express.Router();

router.get("/", fetchSeries);
router.get("/cargar", cargarSeriesJson); 