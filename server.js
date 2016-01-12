var express = require('express');
var app = express();
var routes = require('./config/routes.js')
var config = {
	isDev: process.env.NODE_ENV === 'development',
    port: process.env.PORT
};

require('./config/express')(app, config);

require('./config/routes')(app, config);

require('./config/errorHandlers')(app, config);

app.listen(app.get('port'));


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

new WebpackDevServer(webpack(webpackConfig), {
   hot: true,
   historyApiFallback: true,
   proxy: {
     "*": "http://localhost:3001"
   }
}).listen(3002, 'localhost', function (err, result) {
   if (err) {
     console.log(err);
   }

   console.log('Listening at localhost:3002');
});