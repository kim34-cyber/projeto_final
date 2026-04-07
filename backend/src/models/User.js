import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  senha: DataTypes.STRING,
  perfil: {
    type: DataTypes.ENUM("funcionario", "gestor")
  }
});

export default User;