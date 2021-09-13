const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    maxEntrypointSize: 614400,
    maxAssetSize: 614400,
  },
  devtool: 'source-map',
});
