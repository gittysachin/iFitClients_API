const slsw = require('serverless-webpack');
var nodeExternals = require('webpack-node-externals');

const env = process.env.WEBPACK_MODE;
console.dir(slsw.lib.entries);

module.exports = {
    entry: slsw.lib.entries,
    externals: [nodeExternals()],
    target: 'node',
    mode: env || 'development',
    devtool: 'sourcemap',
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }
        ]
      }
};