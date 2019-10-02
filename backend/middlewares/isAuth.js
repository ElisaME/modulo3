module.exports = route => (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect(route);
}