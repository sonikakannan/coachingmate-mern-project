import express from 'express';
import { signup, login, logout, updateCredits } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/update-credits", updateCredits);


export default router;