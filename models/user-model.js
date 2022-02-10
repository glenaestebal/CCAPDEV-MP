
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {
        type: String,
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
        required: true
    },
	schedules: {
        type: Array,
        required: false
    },
	friends: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('User', UserSchema);