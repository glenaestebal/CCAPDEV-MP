
const express = require('express');
const router = express.Router();

const {saveSchedule, newSchedule, generateTable} = require('../controller/schedule-controller');

router.post('/save', saveSchedule);
router.get('/new', newSchedule);
router.post('/table', generateTable);


module.exports = router;