import express from "express";
import {
  registerUser,
  currentUser,
  loginUser,
} from "../controllers/ClubUserController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post("/registerClub", registerUser);
router.post("/loginClub", loginUser);
router.get("/currentClub", validateToken, currentUser);

export default router;
