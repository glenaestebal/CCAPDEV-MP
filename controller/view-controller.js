

function registerView(req, res) {

    res.render("register", {title: "Register | Schedule Maker"});
}

module.exports = {registerView};