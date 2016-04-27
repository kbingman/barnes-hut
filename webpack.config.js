var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [ './src/app' ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                    plugins: ['transform-object-assign']
                },
                include: path.resolve('..', __dirname)
            }
        ]
    }
};
