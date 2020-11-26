const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  var appTarget = process.env.APP_TARGET || 'dev';
  let defaultConfig = { ...config };
  defaultConfig.plugins[5].options.filename = 'css/[name].css';
  const customConfig = {
    resolve: {
      alias: {
        '@Assets': path.resolve(__dirname, 'src/assets'),
        '@Components': path.resolve(__dirname, 'src/components'),
        '@Constants': path.resolve(__dirname, 'src/constants'),
        '@Containers': path.resolve(__dirname, 'src/containers'),
        '@Helper': path.resolve(__dirname, 'src/helper'),
        '@Network': path.resolve(__dirname, 'src/network')
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
  };
  return { ...defaultConfig, ...customConfig };
};
