const path = require('path');



const mode = {
    development:"development",
    production:"production"
}

module.exports = {
    mode:mode.development,
    entry:"./src/index.ts",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'yn.ui.js',
      library: {
        name: 'ynui',
        type: 'umd',
      },
    },
    resolve: {
      extensions: ['.ts'],
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
}