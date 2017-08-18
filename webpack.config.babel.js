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
    ],
    chart: [
      './app/chart/chart.js',
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
      },
      {
        test: /\.html$/, 
        loader: 'file-loader',
      },
      {
        test: /\.css$/, 
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /\.asitis\.js$/,
        loader: 'file-loader'
      }
    ]
  }
}
