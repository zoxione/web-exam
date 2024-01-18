const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();

const sequelize = require('./config/database');
const passport = require('./config/passport');
const authRoute = require('./routes/auth');
const booksRoute = require('./routes/books');
const librariesRoute = require('./routes/libraries');

const app = express();
const PORT = dotenv.parsed.PORT;

// Middlewares
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: dotenv.parsed.FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

// Routes
app.use('/auth', authRoute);
app.use('/books', booksRoute);
app.use('/libraries', librariesRoute);

sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`\n✨ Сервер запущен: http://localhost:${PORT}\n`);
});
