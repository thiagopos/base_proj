import bcrypt from "bcrypt";
import { obterUsuarioPorLogin } from "../models/queries/consultasAutenticacao.js"; // Substitua pelo caminho correto

export function get(req, res) {
  res.render("login"); // Assuming you have a login view
}

export async function post(req, res) {
  const usuario = req.body;

  try {
    // Check if the user exists in the database
    const usuarioValidado = await obterUsuarioPorLogin(usuario.login_sms);

    if (!usuarioValidado) {
      // User does not exist, redirect to an error page or handle as needed
      res.redirect("/error");
      return;
    }

    if (bcrypt.compare(usuario.senha, usuarioValidado.senha)) {
      req.session.usuario = {
        id_usuario: usuarioValidado.id_usuario,
        login_sms: usuarioValidado.login_sms,
        nome_completo: usuarioValidado.nome_completo
      };
      
      res.redirect("/");
    } else {
      // Password is incorrect, redirect to an error page or handle as needed
      res.status(400).send("Senha incorreta");
    }
  } catch (error) {
    // Handle errors as needed
    console.error(error);
    res.redirect("/error");
  }
}
