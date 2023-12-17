import validate from "../middleware/validate.js";

export const get = async (req, res) => {
  if(await validate(req.session.user, true))
    res.render('dashboard'); // Assuming you have a login view
  else
    res.status(401).send("Usuário não autenticado!");  
};