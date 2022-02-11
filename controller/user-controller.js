
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const saltRound = 8;

function registerUser(req, res) {
   
    if (req.body.password === req.body.confirmPassword) {
        bcrypt.hash(req.body.password, saltRound, (error, hashed) => {
            const user = new User({ email: req.body.email, username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName, password: hashed});
            user.save()
                .then((user) => res.status(200).redirect('/login'))
                .catch((error) => {
                    // remind to handle error
                    console.log(error);
                    res.status(400).send(" ")
                });
        });
    } else {
        // remind to handle error 
        res.status(400).send("");
    }

}

function loginUser(req, res) {
    console.log("Login");
    res.send(' ').status(200);

}

module.exports = {registerUser, loginUser}