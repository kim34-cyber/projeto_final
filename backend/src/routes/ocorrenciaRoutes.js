import express from "express";
import * as controller from "../controllers/ocorrenciaController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { isGestor } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", auth, controller.criar);
router.get("/minhas", auth, controller.minhas);

router.get("/", auth, isGestor, controller.todas);
router.put("/:id", auth, isGestor, controller.atualizar);

export default router;