
const express = require('express');
const router = express.Router();

const { registerView } = require('../controller/view-controller');

router.get('/register', registerView);

module.exports = router;