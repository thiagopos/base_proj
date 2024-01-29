export const get = (req, res) => {  
  if (req.session.mensagem) {
    let mensagem = req.session.mensagem;        
    delete req.session.mensagem;
    res.json(mensagem);
  } else {
    res.status(401).send('Nenhuma mensagem.');
  }
};
