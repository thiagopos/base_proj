import bcrypt from "bcrypt";
import { usuarioSchema } from "../models/schemas/usuarioSchema.js";
import { enviarMensagem } from "./api/mensagens.js";
import {
  inserirUsuario,
  usuarioExiste,
  obterCargosUsuario,
  obterTiposUsuario,
} from "../models/queries/consultasAutenticacao.js";

// Renderiza a página de cadastro com informações sobre tipos de usuários e cargos.
export async function get(req, res) {
  try {
    // Obtém tipos de cargos e tipos de usuários do banco de dados
    const tiposCargos = await obterCargosUsuario();
    const tiposUsuarios = await obterTiposUsuario();

    // Renderiza a página de cadastro com as informações obtidas
    res.render("cadastro.ejs", { tiposUsuarios, tiposCargos });
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao processar a requisição de cadastro:", error);
    res.status(500).send("Erro interno do servidor");
  }
}

// Processa a submissão do formulário de cadastro de usuário.
export async function post(req, res) {
  const usuario = req.body;

  try {
    // Valida os dados do usuário usando o esquema definido
    await usuarioSchema.validate(usuario);

    // Verifica se o usuário já existe no banco de dados
    const usuarioExistente = await usuarioExiste(usuario.login_sms);

    if (usuarioExistente) {
      // Usuário já existe, redireciona para uma página de erro ou trata conforme necessário
      enviarMensagem(req, 'ERRO', 'Usuário já cadastrado.');
      res.redirect("/cadastro");
      return;
    }

    // Gera um hash da senha antes de salvar no banco de dados
    const hash = await bcrypt.hash(usuario.senha, 10);

    // Atualiza a senha do usuário com o hash gerado
    usuario.senha = hash;

    // Insere o usuário no banco de dados
    const userId = await inserirUsuario(usuario);
    
    // Se a inserção for bem-sucedida, redireciona para a página de login
    enviarMensagem(req, 'SUCESSO', 'Usuário cadastrado com sucesso.');
    res.redirect("/login");
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao tentar cadastrar usuário:", error);
    enviarMensagem(req, 'ERRO', 'Erro ao tentar cadastrar usuário.');
    res.redirect("/login");
  }
}
