import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  nome: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    // 👇 ADICIONADO "admin" para bater com o seu Front-end e Middlewares
    type: DataTypes.ENUM("funcionario", "gestor", "admin"),
    allowNull: false
  }
});

export default User;