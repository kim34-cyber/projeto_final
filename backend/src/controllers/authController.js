import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================================
// 1. REGISTRAR USUÁRIO
// ======================================
export const register = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    // Verifica se o usuário já existe usando Sequelize (where)
    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "E-mail já está em uso" });
    }

    // Criptografa a senha
    const hash = await bcrypt.hash(senha, 10);

    // Cria o usuário no banco
    const user = await User.create({
      nome,
      email,
      senha: hash,
      perfil
    });

    // Retorna sucesso (não retorne a senha por segurança)
    res.status(201).json({ 
      mensagem: "Usuário cadastrado com sucesso!",
      user: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil } 
    });

  } catch (error) {
    console.error("Erro no register:", error);
    res.status(500).json({ erro: "Erro interno ao cadastrar usuário" });
  }
};

// ======================================
// 2. FAZER LOGIN
// ======================================
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário no Sequelize
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Verifica se a senha bate com a criptografia
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      return res.status(401).json({ erro: "Senha ou e-mail incorretos" });
    }

    // Gera o token JWT (Sequelize usa user.id, e não _id)
    // Definimos uma chave padrão caso JWT_SECRET não esteja no arquivo .env
    const secret = process.env.JWT_SECRET || "minha_chave_secreta_padrao";
    const token = jwt.sign(
      { id: user.id, perfil: user.perfil },
      secret,
      { expiresIn: "1d" } // Token expira em 1 dia
    );

    // Retorna os dados que o seu arquivo login.js do Front-end espera!
    res.json({ 
      mensagem: "Login realizado com sucesso!",
      token, 
      perfil: user.perfil,
      nome: user.nome
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro interno ao fazer login" });
  }
};

// ======================================
// 3. OBTER PERFIL (Usuário Logado)
// ======================================
export const getProfile = async (req, res) => {
  try {
    // req.user é injetado pelo seu authMiddleware.js
    const userId = req.user.id;

    // Busca o usuário no banco (excluindo a senha do retorno)
    const user = await User.findByPk(userId, {
      attributes: ['id', 'nome', 'email', 'perfil'] 
    });

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro em getProfile:", error);
    res.status(500).json({ erro: "Erro interno ao buscar perfil" });
  }
};

// ======================================
// 4. ESQUECEU A SENHA (Simulação)
// ======================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Retornar a mesma mensagem mesmo se não existir evita expor quais e-mails estão cadastrados (Segurança)
      return res.status(200).json({ mensagem: "Se este e-mail existir na nossa base, as instruções foram enviadas." });
    }

    // Aqui entraria o envio real de e-mail (usando Nodemailer, por exemplo).
    console.log(`[SIMULAÇÃO] E-mail de recuperação de senha enviado para: ${email}`);

    res.json({ mensagem: "Se este e-mail existir na nossa base, as instruções foram enviadas." });
  } catch (error) {
    console.error("Erro em forgotPassword:", error);
    res.status(500).json({ erro: "Erro interno ao processar recuperação" });
  }
};

// ======================================
// 5. REDEFINIR SENHA
// ======================================
export const resetPassword = async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Criptografa a nova senha
    const hash = await bcrypt.hash(novaSenha, 10);
    
    // Atualiza a senha no banco
    user.senha = hash;
    await user.save();

    res.json({ mensagem: "Senha redefinida com sucesso! Você já pode fazer login." });
  } catch (error) {
    console.error("Erro em resetPassword:", error);
    res.status(500).json({ erro: "Erro ao tentar redefinir a senha" });
  }
};