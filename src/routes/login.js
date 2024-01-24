import bcrypt from "bcrypt";
import { obterUsuarioPorLogin } from "../models/queries/consultasAutenticacao.js";

export function get(req, res) {
  res.render("login");
}

export async function post(req, res) {
  const usuario = req.body;

  try {
    const usuarioValidado = await obterUsuarioPorLogin(usuario.login_sms);

    if (!usuarioValidado) {
      // Use flash to set an error message     
      res.redirect("/"); // Redirect to the same page
      return;
    }

    if (await bcrypt.compare(usuario.senha, usuarioValidado.senha)) {
      req.session.usuario = {
        id_usuario: usuarioValidado.id_usuario,
        login_sms: usuarioValidado.login_sms,
        nome_completo: usuarioValidado.nome_completo,
      };

      res.redirect("/");
    } else {      
      res.redirect("/"); // Redirect to the same page
    }
  } catch (error) {
    console.error(error);    
    res.redirect("/");
  }
}
