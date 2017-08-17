module.exports={
  entry: './renderer.js',
  target: 'electron-renderer',
  output:{
    filename:'./renderer-bundle.js'
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
