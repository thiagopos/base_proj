// Realiza o logout do usuário, destruindo a sessão e redirecionando para a página de login.
export async function get(req, res) {
  try {
    // Destrói a sessão do usuário
    req.session.destroy();

    // Redireciona para a página de login
    res.redirect('/login');
  } catch (error) {
    // Trata os erros conforme necessário
    console.error("Erro ao processar a requisição GET para realizar o logout:", error);
    res.status(500).send("Erro interno do servidor");
  }
};
