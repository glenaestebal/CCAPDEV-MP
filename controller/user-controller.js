
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRound = 8;

function registerUser(req, res) {
   
    const { email, username, firstName, lastName, password, confirmPassword } = req.body;
    
    
    // check required fields
    if (email === "" || username === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "" )   {
        return res.render('register', { err: "Please fill in all fields." }  );
    }
    if (password === confirmPassword) {
        bcrypt.hash(password, saltRound, (error, hashed) => {
            const user = new User({ email: email, username: username, firstName: firstName, lastName: lastName, password: hashed});
            user.save()
                .then((user) => res.status(200).redirect('/login'))
                .catch((error) => {
                    if (error.code === 11000)   {
                        res.render('register', { err: "Email or username is already in use."});
                    }
                    res.render('register', { err: "An error occurred."});
                });
        });
    } else {
        // check password match
        res.render('register', { err: "Passwords do not match." }); 
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