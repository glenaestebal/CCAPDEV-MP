
const User = require('../models/user-model');
const Schedule = require('../models/schedule-model');
const ScheduleItem = require('../models/scheduleitem-model');

function saveSchedule(req, res) {
	
	const scheduleItem = new ScheduleItem({ time: req.body.time, day: req.body.day, event: req.body.event});
	User.findById(req.user.id, function(err, user){
		var schedule = user.schedules[req.body.schednum - 1];
		schedule.item.push(scheduleItem);
		schedule.save();
		user.save();
	});
	scheduleItem.save()
                .then((scheduleItem) => res.status(200).redirect('/schedules'))
                .catch((error) => {
                    // remind to handle error
                    console.log(error);
                    res.status(400).send(" ")
                });
}

function newSchedule(req, res) {
	User.findById(req.user.id, function(err, user){
		const schedule = new Schedule();
		user.schedules.push(schedule);
		user.save();
	});
}

function generateTable(req, res) {
	//Build an array containing Customer records.
	var schedtable = new Array();
	schedtable.push(["Time", "Sunday", "Time", "Monday", "Time", "Tuesday","Time", "Wednesday","Time", "Thursday","Time", "Friday","Time", "Saturday"]);
	
	User.findById(req.user.id, function(err, user){
		var schedule = user.schedules[req.body.schednum - 1];
		schedule.item.sort(function(a, b) {
			return parseFloat(a.time) - parseFloat(b.time);
		});
		for (let i = 0; i < schedule.item.length; i++){
			if (schedule.item[i].day == "sunday"){
				schedtable.push([schedule.item[i].time, schedule.item[i].event, "", "", "", "", "", "", "", "", "", "", "", ""]);
			}
			else if (schedule.item[i].day == "monday"){
				schedtable.push(["", "", schedule.item[i].time, schedule.item[i].event, "", "", "", "", "", "", "", "", "", ""]);
			}
			else if (schedule.item[i].day == "tuesday"){
				schedtable.push(["", "", "", "", schedule.item[i].time, schedule.item[i].event, "", "", "", "", "", "", "", ""]);
			}
			else if (schedule.item[i].day == "wednesday"){
				schedtable.push(["", "", "", "", "", "", schedule.item[i].time, schedule.item[i].event, "", "", "", "", "", ""]);
			}
			else if (schedule.item[i].day == "thursday"){
				schedtable.push(["", "", "", "", "", "", "", "", schedule.item[i].time, schedule.item[i].event, "", "", "", ""]);
			}
			else if (schedule.item[i].day == "friday"){
				schedtable.push(["", "", "", "", "", "", "", "", "", "", schedule.item[i].time, schedule.item[i].event, "", ""]);
			}
			else if (schedule.item[i].day == "saturday"){
				schedtable.push(["", "", "", "", "", "", "", "", "", "", "", "", schedule.item[i].time, schedule.item[i].event]);
			}
		}
	});

	res.render("schedules.hbs", {array: schedtable});
}

module.exports = {saveSchedule, newSchedule, generateTable}