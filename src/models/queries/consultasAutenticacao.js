import { connect } from '../conn.js';

/**
 * Insere um novo usuário no banco de dados.
 *
 * @param {Object} usuario - O objeto de usuário contendo informações do usuário.
 * @returns {Promise<number>} - O ID do usuário recém-inserido.
 */
export async function inserirUsuario(usuario) {
  const conn = await connect();

  const dataAtual = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    INSERT INTO cad_usuario 
    (login_sms, nome_completo, doc_cpf, senha, email, contato, doc_profissional,
    dt_cadastro, dt_atualizacao, id_tipo_usuario, id_tipo_cargo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

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
    usuario.id_tipo_cargo
  ];

  const resultado = await conn.query(sql, valores);

  return resultado[0].insertId;
}

/**
 * Obtém um usuário com base no seu login.
 *
 * @param {string} login - O login do usuário.
 * @returns {Promise<Object|null>} - O objeto do usuário se encontrado, caso contrário, nulo.
 */
export async function obterUsuarioPorLogin(login) {
  const conn = await connect();
  const sql = "SELECT * FROM cad_usuario WHERE login_sms = ?";

  try {
    const [resultado] = await conn.query(sql, [login]);

    if (resultado.length === 0)
      return null;
    
    return resultado[0];

  } catch (error) {
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
  const conn = await connect();
  const sql = "SELECT login_sms FROM cad_usuario WHERE login_sms = ?";

  try {
    const [resultado] = await conn.query(sql, [login]);

    return resultado.length > 0;

  } catch(error) {
    throw error;
  }
}

/**
 * Obtém os tipos de usuário do banco de dados.
 *
 * @returns {Promise<Object>} - Informações sobre os tipos de usuário.
 */
export async function obterTiposUsuario() {
  const conn = await connect();
  const sql = "SELECT id_tipo_usuario, desc_usuario, ordenacao FROM cad_usuario_tipo;"

  try {
    const [resultado] = await conn.query(sql);
    
    return resultado;

  } catch (error) {
    throw error;
  }
}

/**
 * Obtém os cargos de usuário do banco de dados.
 *
 * @returns {Promise<Object>} - Informações sobre os cargos de usuário.
 */
export async function obterCargosUsuario() {
  const conn = await connect();
  const sql = "SELECT id_tipo_cargo, desc_cargo FROM cad_usuario_cargo;"

  try {
    const [resultado] = await conn.query(sql);
    
    return resultado;

  } catch (error) {
    throw error;
  }
}
