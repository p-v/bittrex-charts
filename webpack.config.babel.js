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
          'css-loader?modules&sourceMap&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.asitis\.js$/,
        loader: 'file-loader'
      }
    ]
  }
}
