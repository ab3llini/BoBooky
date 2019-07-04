'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var serveStatic = require('serve-static');
const swaggerUi = require('swagger-ui-express');

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

var writer = require('./other/utils/writer');

passport.use(new Strategy(
    function (username, password, done) {


        db.userLoginPOST({
            username: username,
            password: password
        })
            .then((result) => {
                console.log('New login from: ' + username);
                done(null, {
                    name: result.name,
                    surname: result.surname,
                    email: result.email,
                    birthdate : result.birthdate,
                    id: result.id
                })
            })
            .catch(e => {
                console.log('New login attempt failed from: ' + username);
                done(null, false)
            })
    }
));

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './other/controllers'),
    useStubs: process.env.NODE_ENV === 'development', // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname, 'other/api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use(session({secret: "user"}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user/login', function (req, res, next) {
    if (req.user)
        req.logout();
    passport.authenticate('local')(req, res, next)
}, (req, res, next) => {
    writer.writeJson(res, {user: req.user})
});

app.use('/api/user/logout', function (req, res, next) {
    req.logout();
    console.log('Logging out');
    writer.writeJson(res, {massage: 'Logout successful'})
});

app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.get('/profile/*', (req, res, next) => {
    if (req.user !== undefined)
        return next();
    return res.status(401).json({
        error: 'Forbidden section: user not authenticated'
    })

}, function (req, res, next) {
    return next()
});

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    app.use((req, res, next) => {
        middleware.swaggerSecurity({
            BoBookyAuth: function (req, authOrSecDef, scopesOrApiKey, callback) {
                if (!req.user) {
                    writer.writeJson(res, writer.respondWithCode(401, 'Not authorized'))
                } else
                    callback()
            }
        })(req, res, next)
    });

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    app.use(serveStatic(path.join(__dirname, 'node_modules')));
    app.use(serveStatic(path.join(__dirname, 'public')));


    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Server up and running.')
        console.log('Backend docs served at /backend/main.html')
        console.log('Swagger docs served at /backend/swaggerui')

    });

});
