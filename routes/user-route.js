
const express = require('express');
const router = express.Router();
const passport = require('passport');

const {registerUser, loginUser} = require('../controller/user-controller');
// app.use('/users', userRoute);
//  localhost:3000/users/register
router.post('/register', registerUser);
router.post('/login', loginUser);



module.exports = router;