
var mongoose = require('mongoose');

const scheduleItem = require('./scheduleitem-model').schema;
const schedule = require('./schedule-model').schema;

var UserSchema = new mongoose.Schema({
	username: {
        type: String,
		unique: true,
        required: true
    },
	password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
	bio: {
        type: String,
        required: false
    },
	email: {
        type: String,
		unique: true,
        required: true
    },
	schedules: [{
        type: schedule,
        required: false
    }],
	friends: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);