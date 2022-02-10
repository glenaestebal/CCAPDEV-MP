
const User = require('../models/user-model');

function registerUser(req, res) {
    const user = new User({...req.body});
    user.save()
        .then((user) => res.status(200).send(" "))
        .catch((error) => {
                console.log(error);
                res.status(400).send(" ")
            });
}

function loginUser(req, res) {
    console.log("Login");
    res.send(' ').status(200);

}

module.exports = {registerUser, loginUser}