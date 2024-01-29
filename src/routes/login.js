import bcrypt from "bcrypt";
import { obterUsuarioPorLogin } from "../models/queries/consultasAutenticacao.js";

// Renderiza a página de login.
export function get(req, res) {
  res.render("login");
}

// Processa a submissão do formulário de login.
export async function post(req, res) {
  const usuario = req.body;

  try {
    // Obtém o usuário com base no login
    const usuarioValidado = await obterUsuarioPorLogin(usuario.login_sms);

    if (!usuarioValidado) {
      // Usuário não encontrado, redireciona para a página de login
      req.session.mensagem = { tipo: "erro", texto: "Usuário não cadastrado." };
      res.redirect("/login");      
    }

    // Compara as senhas utilizando bcrypt
    const senhaValida = await bcrypt.compare(usuario.senha, usuarioValidado.senha);

    if (senhaValida) {
      // Autenticação bem-sucedida, armazena informações do usuário na sessão
      req.session.usuario = {
        id_usuario: usuarioValidado.id_usuario,
        login_sms: usuarioValidado.login_sms,
        nome_completo: usuarioValidado.nome_completo,
      };

      // Redireciona para a página inicial
      req.session.mensagem = { tipo: "sucesso", texto: "Usuário logado com sucesso." };
      res.redirect("/");
    } else {
      // Senha inválida, redireciona para a página de login
      req.session.mensagem = { tipo: "erro", texto: "Senha incorreta." };
      res.redirect("/login");
    }
  } catch (error) {
    // Manipula erros durante o processamento
    console.error(error);
    req.session.mensagem = { tipo: "erro", texto: "Falha ao tentar logar usuário." };
    res.redirect("/login");
  }
}
