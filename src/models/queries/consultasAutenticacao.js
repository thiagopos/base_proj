// Importa a função executarQuery do módulo executarQuery.js
import { executarQuery } from "../executarQuery.js";

/**
 * Insere um novo usuário no banco de dados.
 *
 * @param {Object} usuario - O objeto de usuário contendo informações do usuário.
 * @returns {Promise<number>} - O ID do usuário recém-inserido.
 */
export async function inserirUsuario(usuario) {
  try {
    // Obtém a data e hora atuais no formato adequado para o banco de dados.
    const dataAtual = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Define a consulta SQL para inserir um novo usuário.
    const sql = `
      INSERT INTO cad_usuario 
      (login_sms, nome_completo, doc_cpf, senha, email, contato, doc_profissional,
      dt_cadastro, dt_atualizacao, id_tipo_usuario, id_tipo_cargo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Define os valores a serem inseridos na consulta.
    const valores = [
      usuario.login_sms,
      usuario.nome_completo,
      usuario.doc_cpf,
      usuario.senha,
      usuario.email,
      usuario.contato,
      usuario.doc_profissional,
      dataAtual,
      dataAtual,
      usuario.id_tipo_usuario,
      usuario.id_tipo_cargo,
    ];

    // Executa a consulta SQL e retorna o ID do usuário inserido.
    const resultado = await executarQuery(sql, valores);
    return resultado.insertId;
  } catch (error) {
    // Em caso de erro, registra a mensagem de erro no console e lança o erro novamente.
    console.error("Erro ao inserir usuário:", error.message);
    throw error;
  }
}

/**
 * Obtém um usuário com base no seu login.
 *
 * @param {string} login - O login do usuário.
 * @returns {Promise<Object|null>} - O objeto do usuário se encontrado, caso contrário, nulo.
 */
export async function obterUsuarioPorLogin(login) {
  try {
    // Define a consulta SQL para obter um usuário pelo login.
    const sql = "SELECT * FROM cad_usuario WHERE login_sms = ?";

    // Executa a consulta SQL com o login fornecido e retorna o resultado.
    const resultado = await executarQuery(sql, [login]);

    // Se nenhum usuário for encontrado, retorna nulo; caso contrário, retorna o primeiro usuário encontrado.
    return resultado.length === 0 ? null : resultado[0];
  } catch (error) {
    // Em caso de erro, lança o erro novamente.
    throw error;
  }
}

/**
 * Verifica se um usuário com o login fornecido existe.
 *
 * @param {string} login - O login do usuário.
 * @returns {Promise<boolean>} - Verdadeiro se o usuário existir, caso contrário, falso.
 */
export async function usuarioExiste(login) {
  try {
    // Define a consulta SQL para verificar se um usuário com o login fornecido existe.
    const sql = "SELECT login_sms FROM cad_usuario WHERE login_sms = ?";

    // Executa a consulta SQL com o login fornecido e retorna verdadeiro se pelo menos um usuário for encontrado.
    const resultado = await executarQuery(sql, [login]);
    return resultado.length > 0;
  } catch (error) {
    // Em caso de erro, lança o erro novamente.
    throw error;
  }
}

/**
 * Obtém os tipos de usuário do banco de dados.
 *
 * @returns {Promise<Object>} - Informações sobre os tipos de usuário.
 */
export async function obterTiposUsuario() {
  try {
    // Define a consulta SQL para obter informações sobre os tipos de usuário.
    const sql = "SELECT id_tipo_usuario, desc_usuario, ordenacao FROM cad_usuario_tipo;";

    // Executa a consulta SQL e retorna as informações sobre os tipos de usuário.
    return await executarQuery(sql);
  } catch (error) {
    // Em caso de erro, lança o erro novamente.
    throw error;
  }
}

/**
 * Obtém os cargos de usuário do banco de dados.
 *
 * @returns {Promise<Object>} - Informações sobre os cargos de usuário.
 */
export async function obterCargosUsuario() {
  try {
    // Define a consulta SQL para obter informações sobre os cargos de usuário.
    const sql = "SELECT id_tipo_cargo, desc_cargo FROM cad_usuario_cargo;";

    // Executa a consulta SQL e retorna as informações sobre os cargos de usuário.
    return await executarQuery(sql);
  } catch (error) {
    // Em caso de erro, lança o erro novamente.
    throw error;
  }
}
