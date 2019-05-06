'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var serveStatic = require('serve-static');

var app = require('express')();
var passport = require('passport');
var strategy = require('passport-local').Strategy;

passport.use(new strategy(
    function(username, password, done) {
        return done(null, {'name':'dioporco'});
    }
));

var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 80;
var db = require('./other/db/Database.js');

passport.use(new strategy (
    function(username, password, done) {
        db.userLoginPOST({
            username: username,
            password: password
        })
            .then((result) => {
                console.log(result)
                done(null, {username: username})
            })
            .catch(e => {
                console.log(e)
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

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    app.use(middleware.swaggerSecurity({
        OAuth2: function (req, authOrSecDef, scopesOrApiKey, callback) {

        }}))

    app.get('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            console.log(user)
        })(req, res, next);
    });

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
