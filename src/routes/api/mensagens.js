
// Rota para obter a mensagem da sessão.
// Se houver uma mensagem, ela é enviada como resposta.
// Caso contrário, retorna um status 401 (Não Autorizado) com uma mensagem indicando a ausência de mensagens.
export const get = (req, res) => {
  try {
    // Verifica se há uma mensagem na sessão
    if (req.session.mensagem) {
      // Se houver, salva a mensagem, remove da sessão e a envia como resposta
      let mensagem = req.session.mensagem;
      delete req.session.mensagem;
      res.json(mensagem);
    } else {
      // Se não houver mensagem, retorna um status 401 e uma mensagem indicando a ausência
      res.status(401).send('Nenhuma mensagem.');
    }
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao processar a requisição GET para obter mensagem da sessão:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

/**
 * Insere uma mensagem na sessão para exibição posterior.
 *
 * @param {object} req - Objeto da requisição.
 * @param {string} tipo - Tipo da mensagem. Pode ser 'ERRO', 'ALERTA' ou 'SUCESSO'.
 * @param {string} texto - Texto da mensagem a ser inserido na sessão.
 * 
 * @example
 * // Exemplo de uso para inserir um erro na sessão
 * enviarMensagem(req, 'ERRO', 'Ocorreu um erro durante a operação.');
 */
export function enviarMensagem(req, tipo, texto) {
  try {
    // Insere a mensagem na sessão
    req.session.mensagem = { tipo, texto };
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao inserir mensagem na sessão:", error);
  }
};
