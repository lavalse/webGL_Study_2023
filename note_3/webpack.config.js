const path = require('path');

module.exports = {

  entry: './src/app.ts',

  mode: 'none',

  output: {

    filename: 'bundle.js',

    path: path.resolve(__dirname, 'dist'),

  },

  module: {

    rules: [

      {

        test: /\.tsx?$/,

        use: 'ts-loader',

        exclude: /node_modules/,

      },
      {
        test: /\.glsl$/,

        use: 'webpack-glsl-loader',

        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,

        use: 'file-loader',

        exclude: /node_modules/,
      }

    ],

  },

  resolve: {

    extensions: ['.tsx', '.ts', '.js'],

  },

  devtool: 'source-map',

  devServer: {

    static:{
      directory: path.resolve(__dirname, 'dist'),
    } 

  },

};