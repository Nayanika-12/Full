import express from "express";
import {getPrice} from "../controllers/BookingController.js";
const router = express.Router();
  
router.get("/:id", getPrice);
export default router;