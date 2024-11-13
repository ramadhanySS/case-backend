const router = require('express').Router();
const authController = require('./controller');
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;

passport.use(new LocalStategy({ usernameField: 'email' }, authController.localStategy));
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.me)

module.exports = router;
