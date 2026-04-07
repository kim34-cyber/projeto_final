import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Ocorrencia = sequelize.define("Ocorrencia", {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  categoria: DataTypes.STRING,
  setor: DataTypes.STRING,
  local: DataTypes.STRING,
  urgencia: DataTypes.STRING,

  status: {
    type: DataTypes.ENUM("Aberta", "Em análise", "Em andamento", "Concluída"),
    defaultValue: "Aberta"
  },

  prioridade: {
    type: DataTypes.ENUM("baixa", "média", "alta", "crítica"),
    defaultValue: "baixa"
  }
});

export default Ocorrencia;