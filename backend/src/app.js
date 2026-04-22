import express from "express";
import cors from "cors";

// Importação das rotas
import authRoutes from "./routes/authRoutes.js";
import ocorrenciaRoutes from "./routes/ocorrenciaRoutes.js";
import sugestaoRoutes from "./routes/sugestaoRoutes.js";

const app = express();

// ==============================
// MIDDLEWARES GLOBAIS
// ==============================
// Permite requisições do seu front-end (evita o erro de CORS no console do navegador)
app.use(cors()); 

// Permite que a API leia o corpo das requisições (req.body) em formato JSON
app.use(express.json()); 

// Permite que a API leia dados enviados diretamente de tags <form> do HTML
app.use(express.urlencoded({ extended: true })); 

// ==============================
// CONFIGURAÇÃO DAS ROTAS BASE
// ==============================
// As URLs ficarão, por exemplo: http://localhost:3000/auth/login
app.use("/auth", authRoutes);
app.use("/ocorrencias", ocorrenciaRoutes);
app.use("/sugestoes", sugestaoRoutes);

export default app;