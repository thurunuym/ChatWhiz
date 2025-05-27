import express from "express";

const router = express.Router();
import { signup } from '../controllers/auth.controller.js';


router.post('/signup', signup);


router.post("/login", (req,res) => {
    res.send("login route");
});

router.get("/logout", (req,res) => {
    res.send("logout route");
});


export default router;