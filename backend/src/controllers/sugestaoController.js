import { Sugestao, User } from "../models/index.js";

// criar
export const criar = async (req, res) => {
  const sugestao = await Sugestao.create({
    ...req.body,
    UserId: req.user.id
  });

  res.json(sugestao);
};

// minhas
export const minhas = async (req, res) => {
  const lista = await Sugestao.findAll({
    where: { UserId: req.user.id }
  });

  res.json(lista);
};

// todas
export const todas = async (req, res) => {
  const lista = await Sugestao.findAll({
    include: User
  });

  res.json(lista);
};

// atualizar
export const atualizar = async (req, res) => {
  const { id } = req.params;

  await Sugestao.update(req.body, {
    where: { id }
  });

  const atualizada = await Sugestao.findByPk(id);

  res.json(atualizada);
};