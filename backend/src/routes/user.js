const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');
