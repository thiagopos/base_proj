export const get = (req, res) => {
  if (req.session.user)
    res.json({ data: "Olá, " + req.session.user.login + "!" });
  else 
    res.status(401).json({ data: "Você não está logado!" });
};
