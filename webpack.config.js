/**
 * Created by vyt on 2015-03-12.
 */
module.exports = {
  entry: __dirname+'/public/javascripts/gameWrap.js',
  output: {
    filename: __dirname+'/public/javascripts/mainbundle.js'
  },
  module: {
      loaders: [{ test: /\.css$/, loader: "style!css" }]
  }
};