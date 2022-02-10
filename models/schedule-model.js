
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var ScheduleSchema = new mongoose.Schema({
	Time: {
        type: Array,
        required: true
    },
	mon: {
		type: Array,
        required: true
    },
    tues: {
        type: Array,
        required: true
    },
    wed: {
        type: Array,
        required: true
    },
	thur: {
        type: Array,
        required: true
    },
	fri: {
        type: Array,
        required: true
    },
	sat: {
        type: Array,
        required: true
    },
	sun: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);