const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const passport = require('../config/passport');

const { signup, login, logout} = require('../controllers/auth');
const { getProfile, editProfile } = require('../controllers/profile');
const { sendTest } = require('../controllers/test');
const { createCareer, allCareers, careerDetail } = require('../controllers/career');


router.post('/signup', signup);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', logout);
router.get('/profile', isAuth('/api/login'), getProfile);
router.put('/profile', isAuth('/api/login'), editProfile);
router.post('/test', isAuth('/api/login'), sendTest);
router.post('/createCareer', createCareer);
router.get('/careers', allCareers);
router.get('/career/:id', careerDetail);

module.exports = router;