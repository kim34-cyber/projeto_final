import { Sequelize } from "sequelize";
import "dotenv/config"; // Garante que as variáveis de ambiente sejam carregadas

// Puxa os dados do arquivo .env. Se o .env não existir, usa os seus dados locais como garantia (fallback).
const dbName = process.env.DB_NAME || "sigos";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASS || "alunolab";
const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 3303;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  port: dbPort,
  logging: false, // Opcional: Coloque 'console.log' se quiser ver os comandos SQL rodando no terminal
});

export default sequelize;