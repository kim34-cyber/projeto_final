import "dotenv/config"; // Importação CRÍTICA para ler o arquivo .env
import app from "./app.js";
import sequelize from "./config/db.js";

// Importa os modelos para garantir que o Sequelize saiba quais tabelas criar/sincronizar
import "./models/index.js";

async function startServer() {
  try {
    // 1. Testa a conexão com o MySQL
    await sequelize.authenticate();
    console.log("🔥 Conexão com o banco de dados (MySQL) estabelecida com sucesso!");

    // 2. Sincroniza os modelos com o banco (cria as tabelas se não existirem)
    // Dica: Se você alterar colunas no futuro durante o desenvolvimento, pode usar await sequelize.sync({ alter: true });
    await sequelize.sync();
    console.log("📦 Modelos sincronizados com o banco de dados.");

    // 3. Inicia o servidor na porta do .env ou na 3000 por padrão
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erro fatal ao iniciar servidor:");
    console.error(error);
  }
}

startServer();