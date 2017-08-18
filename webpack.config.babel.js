import path from 'path';

export default {
  target: 'electron-renderer',
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  entry: {
    markets: [
      './app/index.js',
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query:{
          presets:['react','es2015']
        }
      }
    ]
  }
}
