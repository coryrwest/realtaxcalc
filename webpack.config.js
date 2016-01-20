var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3002',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'js/bundle.js',
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/, 
                loaders: ['react-hot', 'jsx-loader?harmony'], 
                include: path.join(__dirname, 'src')
            },
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style','css!sass') }
            //{test: path.join(__dirname, 'src/common'), loader: 'babel-loader'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles/bundle.css'),
    ]
};