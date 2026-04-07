import app from "./app.js";
import sequelize from "./config/db.js";

import "./models/index.js";

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("🔥 Conectado ao banco");

    await sequelize.sync();
    console.log("📦 Banco sincronizado");

    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });

  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:");
    console.error(error);
  }
}

startServer();