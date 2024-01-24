export const get = (req, res) => {
  if (req.session.usuario)
    res.json({ data: "Olá, " + req.session.usuario.nome_completo + "!" });
  else 
    res.status(401).json({ data: "Você não está logado!" });
};
