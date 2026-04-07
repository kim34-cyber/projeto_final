import { Ocorrencia, User } from "../models/index.js";

// criar
export const criar = async (req, res) => {
  const ocorrencia = await Ocorrencia.create({
    ...req.body,
    UserId: req.user.id
  });

  res.json(ocorrencia);
};

// minhas
export const minhas = async (req, res) => {
  const lista = await Ocorrencia.findAll({
    where: { UserId: req.user.id }
  });

  res.json(lista);
};

// todas (gestor)
export const todas = async (req, res) => {
  const lista = await Ocorrencia.findAll({
    include: User
  });

  res.json(lista);
};

// atualizar
export const atualizar = async (req, res) => {
  const { id } = req.params;

  await Ocorrencia.update(req.body, {
    where: { id }
  });

  const atualizada = await Ocorrencia.findByPk(id);

  res.json(atualizada);
};