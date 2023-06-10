import express from "express";
import {
  registerUser,
  currentUser,
  loginUser,
} from "../controllers/UserController.js";
import validateToken from "../middleware/validateTokenHandler.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

export default router;
