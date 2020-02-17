const express = require('express');
const router = express.Router();
const uc = require('../controllers/user.controller');
const dc = require('../controllers/drafts.controller');

router.post('/login',uc.login);
router.post('/register',uc.register);

router.post('/saveDraft',dc.saveDraft);
router.post('/findDraft',dc.findDraft);
// router.use('/home',require('./home.route.js'));

module.exports = router;