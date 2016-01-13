
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var config = {
	isDev: process.env.NODE_ENV === 'development'
};

new WebpackDevServer(webpack(webpackConfig), {
   hot: true,
   historyApiFallback: true,
   publicPath: webpackConfig.output.publicPath,
}).listen(3002, 'localhost', function (err, result) {
   if (err) {
     console.log(err);
   }

   console.log('Listening at localhost:3002');
});