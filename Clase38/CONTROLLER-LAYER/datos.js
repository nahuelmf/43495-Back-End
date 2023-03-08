const businessLayer = require('../BUSINESS-LAYER/datos.js');

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

const getRoute = (req, res) => {
  res.render('login', {});
};

const getLogin = (req, res) => {
  res.render('login', {});
};

const getFailLogin = (req, res) => {
  res.render('failLogin', {});
};

const getSignUp = (req, res) => {
  res.render('signup');
};

const getFailSignUp = (req, res) => {
  res.render('failSignUp', {});
};

function getLogout(req, res) {
  const { username, password } = req.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("No se pudo deslogear");
    } else {
      res.render("logout", { usuario: username });
    }
  });
}

const failRoute = (req, res) => {
  res.render('failRoute', {});
  res.status(404);
};

const postLogin = (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.render('profileUser', { user });
};

const postSignUp = (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.render('successSignUp', { user });
};

module.exports = { checkAuthentication, getRoute, getLogin, getFailLogin, getSignUp, getFailSignUp, failRoute, getLogout, postLogin, postSignUp };
