// Rota para obter dados do usuário logado.
export const get = (req, res) => {
  try {
    // Verifica se há um usuário na sessão
    if (req.session.usuario) {
      // Se houver, envia uma mensagem de boas-vindas com o nome do usuário
      res.json({ data: "Olá, " + req.session.usuario.nome_completo + "!" });
    } else {
      // Se não houver usuário, retorna um status 401 e uma mensagem indicando a ausência de login
      res.status(401).json({ data: "Você não está logado!" });
    }
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao processar a requisição GET para obter dados do usuário:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

