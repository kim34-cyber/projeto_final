import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Sugestao = sequelize.define("Sugestao", {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  setor: DataTypes.STRING,
  beneficio: DataTypes.TEXT,

  status: {
    type: DataTypes.ENUM("Enviada", "Em análise", "Aprovada", "Rejeitada"),
    defaultValue: "Enviada"
  }
});

export default Sugestao;