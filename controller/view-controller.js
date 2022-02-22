

function registerView(req, res) {
    res.render("register", {title: "Register | Schedule Maker"});
}

function loginView(req, res) {
  res.render("login", {title: "Login | Schedule Maker"});
}

function scheduleView(req, res) {
  res.render("schedules", {title: "Schedules | Schedule Maker", user: req.user, scheduleCount: req.user.schedules.length, schedules: req.user.schedules});
}

function profileView(req, res) {
  res.render("profile", {title: "Profile | Schedule Maker", user: req.user.toJSON()});
}


module.exports = {registerView, loginView, scheduleView, profileView};