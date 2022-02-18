
const express = require('express');
const router = express.Router();
const passport = require('passport');

const {updateUser, registerUser, loginUser, logoutUser} = require('../controller/user-controller');
// app.use('/users', userRoute);
//  localhost:3000/users/register

router.put('/edit-profile', updateUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);


module.exports = router;