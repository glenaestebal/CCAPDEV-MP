
const User = require('../models/user-model');
const Schedule = require('../models/schedule-model');
const ScheduleItem = require('../models/scheduleitem-model');

function saveSchedule(req, res) {
	
	let exists = false;
	let error = [];
	const scheduleItem = new ScheduleItem({ time: req.body.time, day: req.body.day, event: req.body.event});
	User.findById(req.user.id, function(err, user){
		var schedule = user.schedules[req.body.schednum];
		for (let i = 0; i < schedule.item.length; i++){
			if (req.body.time == schedule.item[i].time && req.body.day == schedule.item[i].day){
				exists = true;
			}
		}	
		if (!(exists)){
		schedule.item.push(scheduleItem);
		user.save();
		scheduleItem.save()
			.then((scheduleItem) => res.status(200).redirect('/schedules'))
			.catch((error) => {
				// remind to handle error
				console.log(error);
				res.status(400).send(" ")
			});
		}
		else {
		res.render("schedules.hbs", {user: req.user, schedules: req.user.schedules, error: ["Schedule slot is not vacant."]});
		}
	});
		
	
}

function newSchedule(req, res) {
	
	let added = [];
	User.findById(req.user.id, function(err, user){
		const schedule = new Schedule();
		user.schedules.push(schedule);
		user.save();
		res.render("schedules.hbs", {user: req.user, schedules: user.schedules, added: ["A new schedule is added."]});
	});
	
}

function generateTable(req, res) {
	//Build an array containing Customer records.
	var schedtable = new Array();
	schedtable.push(["Time", "Sunday", "Time", "Monday", "Time", "Tuesday","Time", "Wednesday","Time", "Thursday","Time", "Friday","Time", "Saturday"]);
	
	User.findById(req.user.id, function(err, user){
		var schedule = user.schedules[req.body.schednum];
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

	res.render("schedules.hbs", {array: schedtable, user: req.user, schedules: req.user.schedules});
}

module.exports = {saveSchedule, newSchedule, generateTable}