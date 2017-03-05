var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

//# region [Authentication]

// Define the strategy to be used by PassportJS
passport.use(new Strategy(
    function (username, password, done) {
        if (username === "admin" && password === "admin")
            return done(null, {name: "admin"});

        return done(null, false, {message: 'Incorrect username.'});
    }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

//#endregion

//#region [Config]

var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

//#endregion

//#region [Routes]

// Serve Angular application
var angularApp = express.static(path.join(__dirname, '../dist'));
app.use(angularApp);

var fswebcam = require('./fswebcam');
app.use('/api/v1/fswebcam', auth, fswebcam);

// Route to log in
app.post('/api/v1/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
});

// Route to log out
app.post('/api/v1/logout', function (req, res) {
    req.logOut();
    res.sendStatus(200);
});

// 404 catch, direct default GET requests to the client router
app.all('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
});

//#endregion

http.createServer(app).listen(8080, function () {
    console.log('Express server listening on port 8080');
});
