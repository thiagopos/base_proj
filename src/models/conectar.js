import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: "./.env" });

/**
 * Estabelece uma conexão com o banco de dados MySQL.
 *
 * @returns {Promise} - Uma Promise que resolve com a conexão estabelecida.
 */
export async function conectar() {
  // Verifica se já existe uma conexão ativa e a retorna se estiver conectada.
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  // Cria uma nova conexão com as credenciais do arquivo .env
  const conexao = await mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  });

  // Armazena a conexão globalmente para reutilização.
  global.connection = conexao;

  // Retorna a conexão recém-estabelecida.
  return conexao;
}
