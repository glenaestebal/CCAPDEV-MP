
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/user-model');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ username: 'username' }, (username, password, done) => {

            // matching user
            User.findOne({ username: username })
                .then(user => {
                    if(!user) {
                        return done(null, false);
                    }

                    // matching password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                })
                .catch((error) => {
                    // remind to handle error
                    console.log(error);
                    res.status(400).send(" ")
                });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
}