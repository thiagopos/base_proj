// Importando as bibliotecas necessárias
import dotenv from 'dotenv'; // Biblioteca para carregar variáveis de ambiente
import mysql from 'mysql2/promise'; // Biblioteca para conexão com o banco de dados MySQL
dotenv.config({ path: "./.env" }); // Carrega as variáveis de ambiente do arquivo .env

// Função responsável por estabelecer a conexão com o banco de dados
export const connect = async () => {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const connection = await mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  });

  global.connection = connection;

  return connection;
};

