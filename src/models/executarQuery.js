import { conectar } from "./conectar.js";

/**
 * Executa uma query no banco de dados.
 *
 * @param {string} sql - A consulta SQL a ser executada.
 * @param {Array} values - Os valores a serem substituídos na consulta.
 * @returns {Promise} - Uma Promise que resolve com o resultado da consulta.
 * @throws {Error} - Lança um erro em caso de falha na execução da consulta.
 */
export async function executarQuery(sql, values) {
  // Estabelece uma conexão com o banco de dados.
  const conexao = await conectar();

  try {
    // Executa a query no banco de dados e armazena o resultado.
    const [result] = await conexao.query(sql, values);

    // Retorna o resultado da consulta.
    return result;
  } catch (error) {
    // Em caso de erro, registra a mensagem de erro no console.
    console.error("Erro ao executar query:", error.message);

    // Lança o erro novamente para tratamento posterior.
    throw error;
  }
}
