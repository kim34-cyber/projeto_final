import User from "../models/User.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
 
export const register = async (req, res) => { 
  const { nome, email, senha, perfil } = req.body; 
 
  const hash = await bcrypt.hash(senha, 10); 
 
  const user = await User.create({ 
    nome, 
    email, 
    senha: hash, 
    perfil 
  }); 
 
  res.json(user); 
}; 
 
export const login = async (req, res) => { 
  const { email, senha } = req.body; 
 
  const user = await User.findOne({ email }); 
  if (!user) return res.status(404).json({ erro: "Usuário não encontrado" }); 
 
  const valid = await bcrypt.compare(senha, user.senha); 
  if (!valid) return res.status(401).json({ erro: "Senha inválida" }); 
 
  const token = jwt.sign( 
    { id: user._id, perfil: user.perfil }, 
    process.env.JWT_SECRET 
  ); 
 
  res.json({ token, perfil: user.perfil }); 
}; 