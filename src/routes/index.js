import validarUsuario from "../middleware/validarUsuario.js";

export async function get(req,res) {
  const usuario = req.session.usuario
  if(await validarUsuario(usuario))
    res.render('index', { usuario }); 
  else
    res.status(401).send("Usuário não autenticado!");  
};