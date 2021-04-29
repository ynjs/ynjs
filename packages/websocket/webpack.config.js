const path = require('path');
module.exports = {
  mode:"production",//  production  development
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'yn-WebSocket.js',
    path: path.resolve(__dirname, 'dist'),
    library: "YNWebSocket",
  },
};