
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	time: {
        type: String,
        required: true
    },
	
	day: {
		type: String,
		required: true
	},
	
	event: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', ItemSchema);