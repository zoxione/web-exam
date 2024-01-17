const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as needed

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        done(null, {
          id: user.id,
          username: user.username,
          name: user.name,
        });
      } else {
        done(null, false);
      }
    } else {
      done(null, false);
    }
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
