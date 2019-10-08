const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const passport = require('../config/passport');

const { signup, login, logout} = require('../controllers/auth');
const { getProfile, editProfile, getUser } = require('../controllers/profile');
const { sendTest } = require('../controllers/test');
const { createCareer, allCareers, careerDetail, mentorCareer } = require('../controllers/career');
const { newEvent, editEvent, deleteEvent, eventsMentor} = require('../controllers/event');


router.post('/signup', signup);
router.post('/login', passport.authenticate('local'), login);
router.get('/logout', logout);
router.get('/profile', isAuth('/api/login'), getProfile);
router.put('/profile', isAuth('/api/login'), editProfile);
router.post('/test', isAuth('/api/login'), sendTest);
router.post('/createCareer', createCareer);
router.get('/careers', allCareers);
router.get('/career/:id', careerDetail);
router.post('/career/asign', mentorCareer);
router.post('/newEvent', newEvent);
router.put('/editEvent/:id', editEvent);
router.delete('/eraseEvent/:id', deleteEvent);
router.get('/mentor-events/:id', eventsMentor);
router.get('/user/:id', getUser);

module.exports = router;