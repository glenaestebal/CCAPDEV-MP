
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const { registerView, loginView, scheduleView, profileView } = require('../controller/view-controller');

router.get('/register', forwardAuthenticated, registerView);
router.get('/login', forwardAuthenticated, loginView);
router.get('/schedules', ensureAuthenticated, scheduleView);
router.get('/profile', ensureAuthenticated, profileView);

module.exports = router;