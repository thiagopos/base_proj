import bcrypt from 'bcrypt';
import { getUserByLogin } from '../models/queries/authenticationQueries.js'; // Substitua pelo caminho correto

export const get = (req, res) => {
  res.render('login'); // Assuming you have a login view
};

export const post = async (req, res) => {
  const { login, senha: password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await getUserByLogin(login);

    if (!user) {
      // User does not exist, redirect to an error page or handle as needed
      res.redirect('/error');
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      req.session.user = {login: user.login, admin: user.admin}; // Assuming you have a session middleware
      res.redirect('/');
    } else {
      // Password is incorrect, redirect to an error page or handle as needed
      res.status(400).send("Senha incorreta");
    }
  } catch (error) {
    // Handle errors as needed
    console.error(error);
    res.redirect('/error');
  }
};
