import { conectar } from "./conectar.js";

export async function executarQuery(sql, values) {
  const conexao = await conectar();
  try {
    const [result] = await conexao.query(sql, values);
    return result;
  } catch (error) {
    console.error("Erro ao executar query:", error.message);
    throw error;
  }
}