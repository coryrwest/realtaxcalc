var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
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
                test: /\.(jsx|js)$/, loader: 'babel-loader', query: {
                    presets: ['react', 'es2015']
                },
                include: path.join(__dirname, 'src')
            },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    },
};