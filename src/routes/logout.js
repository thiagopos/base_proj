export const get = (req, res) => {
  req.session.destroy();
  res.redirect('/login'); // Assuming you have a login view
};