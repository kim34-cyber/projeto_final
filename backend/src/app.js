import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import ocorrenciaRoutes from "./routes/ocorrenciaRoutes.js";
import sugestaoRoutes from "./routes/sugestaoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/sugestoes", sugestaoRoutes);

export default app;