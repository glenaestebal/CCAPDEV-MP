
const express = require('express');
const app = express();

const mongoose = require('mongoose'); 
const dbURI = 'mongodb://localhost/schedule-db';

const userRoute = require('./routes/user-route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = 3000;

app.use('/users', userRoute);

mongoose.connect(dbURI, {useNewUrlParser : true, useUnifiedTopology: true})
.then(function(result) {
    app.listen(port, function() {
        console.log("You are listening to port", port);
    });  
})
// .then: connects to mongoose first before connecting to server

.catch(function(error)  {
    console.log(error);
});

