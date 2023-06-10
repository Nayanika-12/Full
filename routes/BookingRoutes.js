import express from "express";
import {
  getbookings,
  getbookingsClub,
  createbooking,
  getPrice,
  getBooking,
  updatePricing,
  deleteBooking,
} from "../controllers/BookingController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.get("/:id", validateToken, getbookings); // id here is UserID
router.get("/:id", validateToken, getbookingsClub);  // id here is ClubID
router.get("/:id", validateToken, getBooking);  // id here booking id, not to be used
router.post("/:id", validateToken, createbooking); // to be checked
router.put("/:id", validateToken, updatePricing);
router.delete("/:id", validateToken, deleteBooking);

export default router;
