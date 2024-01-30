import validarUsuario from "../middleware/validarUsuario.js";
import { enviarMensagem } from "./api/mensagens.js";

// Manipula a solicitação GET para a página principal, renderizando a página index se o usuário estiver autenticado.
export async function get(req, res) {
  // Obtém informações do usuário a partir da sessão
  const usuario = req.session.usuario;

  // Verifica se o usuário é válido usando o middleware validarUsuario
  if (await validarUsuario(usuario)) {
    // Se o usuário for válido, renderiza a página index com as informações do usuário
    res.render('index', { usuario });
  } else {
    // Se o usuário não for válido, retorna para a página de login    
    enviarMensagem(req, 'ALERTA', 'Necessário fazer login.')    
    res.redirect("/login");    
  }
};
