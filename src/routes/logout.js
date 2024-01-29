// Realiza o logout do usuário, destruindo a sessão e redirecionando para a página de login.
export async function get(req, res) {
  // Destrói a sessão do usuário
  req.session.destroy();

  // Redireciona para a página de login
  res.redirect('/login');
};
