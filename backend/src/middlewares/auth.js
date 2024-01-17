function auth(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/login/failed');
  }
}

module.exports = auth;
