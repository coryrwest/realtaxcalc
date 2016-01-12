var express = require('express');
var logger = require('morgan');
var path = require('path');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var methodOverride = require('method-override');

module.exports = function (app, config) {
    var port = normalizePort(config.port || '3000');
    app.set('port', port);
	
    // X-Powered-By header has no functional value.
    // Keeping it makes it easier for an attacker to build the site's profile
    // It can be removed safely
    app.disable('x-powered-by');
    app.set('views', __dirname + '/views');
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');

    app.set('view cache', false);

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    //app.use(methodOverride());
    app.use(express.static(path.join(__dirname, '..', 'public')));
  
  
    // Cookie parser should be above session
    // cookieParser - Parse Cookie header and populate req.cookies with an object keyed by cookie names
    // Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret
    // so it may be used by other middleware
    app.use(cookieParser());
};

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}