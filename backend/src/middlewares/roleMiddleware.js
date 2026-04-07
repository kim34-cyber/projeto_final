export const isGestor = (req, res, next) => {
    if (req.user.perfil !== "gestor") {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    next();
  };