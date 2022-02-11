
const express = require('express');
const app = express();
const expHbs = require('express-handlebars');

const mongoose = require('mongoose'); 
const dbURI = 'mongodb://localhost/schedule-db';

const userRoute = require('./routes/user-route');
const viewRoute = require('./routes/view-route');


app.use (express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port = 3000;



app.use('/users', userRoute);

app.use('', viewRoute);

app.get("/", (req, res)=> {
    res.render("index", {title: "Home | Schedule Maker"});
})

const hbs = expHbs.create({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

app.set ('view engine', "hbs");
app.engine ('hbs', hbs.engine);

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

