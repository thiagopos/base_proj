import { connect } from '../conn.js';

export const insertUsuario = async (usuario) => {
  const conn = await connect();

  const data = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  const sql = "INSERT INTO users (login, password, admin, dt_cadastro, dt_atualizacao) VALUES (?, ?, ?, ?, ?)"; 

  const values = [usuario.login, usuario.senha, usuario.admin, data, data];
  const result = await conn.query(sql, values);

  return result[0].insertId;
};

export const getUserByLogin = async (login) => {
  const conn = await connect();
  const sql = "SELECT login, password, admin FROM users WHERE login = ?";
  
  try {
    const result = await conn.query(sql, [login]);
    
    if(result[0].length === 0)
      return null;
    return result[0][0];

  } catch (error) {
    throw error;
  }
};

export const userExists = async (login) => {
  const conn = await connect();
  const sql = "SELECT login FROM users WHERE login = ?";
  
  try {
    const result = await conn.query(sql, [login]);
    
    if(result[0].length === 0)
      return false;
    return true;

  } catch (error) {
    throw error;
  }
}