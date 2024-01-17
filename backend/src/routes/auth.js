const router = require('express').Router();
const passport = require('passport');
const dotenv = require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');

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

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
