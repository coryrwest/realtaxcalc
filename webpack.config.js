var webpack = require('webpack');
var path = require('path');

// var definePlugin = new webpack.DefinePlugin({
//     __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//     __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
// });

// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3002',
        'webpack/hot/only-dev-server',
        './server.js'
    ],
    output: {
        path: 'public/build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/, 
                loaders: ['react-hot', 'jsx-loader?harmony'], 
                include: './src'
            },
            { test: /\.js$/, loader: 'babel-loader' }
            //{test: path.join(__dirname, 'src/common'), loader: 'babel-loader'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};