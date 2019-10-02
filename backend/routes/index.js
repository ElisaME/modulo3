const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const passport = require('../config/passport');

const { signup, login, logout} = require('../controllers/auth');
const { getProfile, editProfile } = require('../controllers/profile');


router.post('/signup', signup);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', logout);
router.get('/profile', isAuth('/auth/login'), getProfile);
router.put('/profile', isAuth('/auth/login'), editProfile);

module.exports = router;