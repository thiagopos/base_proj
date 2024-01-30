import { obterUsuarioPorLogin } from '../models/queries/consultasAutenticacao.js';

/**
 * Valida se um usuário existe com base no login fornecido e verifica o tipo de usuário, se fornecido.
 *
 * @param {Object} usuario - O objeto de usuário a ser validado.
 * @param {number} [idPermissaoEsperada] - O valor esperado de permissão para acessar a página (opcional).
 * @returns {Promise<boolean>} - Verdadeiro se o usuário existir e, se fornecido, tiver a permissão adequada, caso contrário, falso.
 */
export default async function validarUsuario(usuario, idPermissaoEsperada) {
  try {
    // Verifica se o objeto de usuário é válido.
    if (!usuario) {
      return false;
    }

    // Obtém informações do usuário pelo login.
    const usuarioValidado = await obterUsuarioPorLogin(usuario.login_sms);

    // Se o usuário não foi encontrado, retorna falso.
    if (!usuarioValidado) {
      return false;
    }

    // Se a permissão esperada for fornecida, verifica se o id_tipo_usuario do usuário é igual à permissão esperada.
    if (idPermissaoEsperada !== undefined && usuarioValidado.id_tipo_usuario !== idPermissaoEsperada) {
      // Retorna falso se o usuário não tem a permissão adequada.
      return false;
    }

    // Retorna verdadeiro se o usuário foi encontrado e, se fornecido, tem a permissão adequada.
    return true;

  } catch (error) {
    // Em caso de erro, registra o erro no console.
    console.error("Erro ao validar usuário:", error);
    // Pode lançar o erro novamente ou tratar de outra forma, dependendo do contexto.
    throw error;
  }
}
