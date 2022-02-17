
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRound = 8;

function registerUser(req, res) {
   
    const { email, username, firstName, lastName, password, confirmPassword } = req.body;
    let errors = [];
    
    
    // check required fields
    if (email === "" || username === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "" )   {
        errors.push("Please fill in all fields.");
    }

    if (password !== confirmPassword)   {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0)  {
        res.render('register', { errors })
    }
    else    {
        bcrypt.hash(password, saltRound, (error, hashed) => {
            const user = new User({ email: email, username: username, firstName: firstName, lastName: lastName, password: hashed});
            user.save()
                .then((user) => res.status(200).redirect('/login'))
                .catch((error) => {
                    if (error.code === 11000)   {
                        res.render('register', { errors: ["Email or username is already in use."]});
                    }
                    res.render('register', { errors: ["An error occurred."]});
                });
        });
    } 


}

// login 
function loginUser(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/schedules',
        failureRedirect: '/login',
        failureFlash: true 
    })(req, res, next);

}

// logout
function logoutUser(req, res, next) {
    req.logout();
    res.redirect('/login');
}

module.exports = {registerUser, loginUser, logoutUser}