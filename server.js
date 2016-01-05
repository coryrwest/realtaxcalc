var express = require('express');
var app = express();
var routes = require('./config/routes.js')
var config = {
	isDev: process.env.NODE_ENV === 'development'
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

require('./config/express')(app, config);

require('./config/routes')(app, config);

require('./config/errorHandlers')(app, config);

app.listen(app.get('port'));