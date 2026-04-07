import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sigos", "root", "alunolab", {
  host: "127.0.0.1", // 👈 usa isso (melhor que localhost)
  dialect: "mysql",
  port: 3303,
});

export default sequelize;