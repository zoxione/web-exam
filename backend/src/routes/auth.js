const router = require('express').Router();
const passport = require('passport');
const dotenv = require('dotenv').config();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: 'login/success',
    failureRedirect: 'login/failed',
  }),
);

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).send({
      success: true,
      message: 'successful',
      user: req.user,
    });
  } else {
    res.status(401).send({
      success: false,
      message: 'failure',
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).send({
    success: false,
    message: 'failure',
  });
});

router.get('/whoami', (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({
      success: false,
      message: 'failure',
    });
  }
});

router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send({
        success: true,
        message: 'successful',
      });
    });
  } else {
    res.status(401).send({
      success: false,
      message: 'failure',
    });
  }
});

module.exports = router;
