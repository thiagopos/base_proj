import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config({ path: "./.env" });

export async function connect() {
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
}

