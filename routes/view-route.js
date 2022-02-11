
const express = require('express');
const router = express.Router();

const { registerView, loginView, scheduleView } = require('../controller/view-controller');

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/schedules', scheduleView);

module.exports = router;