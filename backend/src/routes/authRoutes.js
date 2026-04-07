import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// cadastrar usuário
router.post("/register", register);

// login
router.post("/login", login);

export default router;