
const express = require('express');
const router = express.Router();

const { registerView, loginView, scheduleView, profileView } = require('../controller/view-controller');

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/schedules', scheduleView);
router.get('/profile', profileView);

module.exports = router;