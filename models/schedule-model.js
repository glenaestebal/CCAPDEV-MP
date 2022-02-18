
// import module `mongoose`
var mongoose = require('mongoose');

const scheduleItem = require("./scheduleitem-model").schema;

// defines the schema for collection `users`
var ScheduleSchema = new mongoose.Schema({
	item: {
		type: [scheduleItem],
		required: true
	}
});

module.exports = mongoose.model('Schedule', ScheduleSchema);