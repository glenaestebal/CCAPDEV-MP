
const express = require('express');
const app = express();
const expHbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');

const mongoose = require('mongoose'); 
const dbURI = 'mongodb://localhost/schedule-db';

const userRoute = require('./routes/user-route');
const scheduleRoute = require('./routes/schedule-route');
const viewRoute = require('./routes/view-route');


app.use (express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'));
const port = 3000;

require('./config/passport')(passport);

const hbs = expHbs.create({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});

app.set ('view engine', "hbs");
app.engine ('hbs', hbs.engine);

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

app.use(function(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.error_msg = req.flash('error_msg');

  next();
});

// routes
app.use('/users', userRoute);
app.use('/schedules', scheduleRoute);
app.use('', viewRoute);

app.get("/", (req, res)=> {
    res.render("index", {title: "Home | Schedule Maker", user: req.user});
})

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

