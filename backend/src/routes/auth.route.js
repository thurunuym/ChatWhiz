import express from "express";

const router = express.Router();
import { signup , login,logout,updateProfile, checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

router.post('/signup', signup);


router.post("/login", login);

router.post("/logout", logout);

//Only users who are authenticated (i.e., have a valid JWT cookie) can access these routes.
router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)


export default router;