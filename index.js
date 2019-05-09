'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var serveStatic = require('serve-static');

var express = require('express');
var app = express();
var session = require("express-session"),
    bodyParser = require("body-parser");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 80;
var db = require('./other/db/Database.js');

passport.use(new Strategy (
    function(username, password, done) {
        db.userLoginPOST({
            username: username,
            password: password
        })
            .then((result) => {
                console.log('logged-in');
                done(null, {username: username, id: result.id})
            })
            .catch(e => {
                console.log('not-logged-in');
                done(null, false)
            })
    }
));

// swaggerRouter configuration
var options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, './other/controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'other/api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.use(session({ secret: "user" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));

app.get('/checkauth', (req,res,next) => {
    if(req.user.id === req.id)
        return next();
    else
        return res.status(401).json({
            error: 'User not authenticated'
        })

}, function(req, res){
    res.status(200).json({
        status: 'Login successful!'
    });
});

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    app.use(middleware.swaggerSecurity({
        OAuth2: function (req, authOrSecDef, scopesOrApiKey, callback) {
            let requestedID = parseInt(req.swagger.params.id.value, 10);
            if(!req.user)
                callback(new Error('You must login'));
            else
                callback()
        }
    }));

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));



    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    app.use(serveStatic(path.join(__dirname, 'node_modules')));
    app.use(serveStatic(path.join(__dirname, 'public')));


    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

});
