const express = require('express');
const router = express.Router();
const uc = require('../controllers/user.controller');

router.post('/login',uc.login);
router.post('/register',uc.register);
// router.use('/home',require('./home.route.js'));

module.exports = router;