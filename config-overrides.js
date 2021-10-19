/* eslint-disable */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

/* config-overrides.js */
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // alias
  config.resolve.alias = {
    ...config.resolve.alias,
    '@root': resolve('src'),
    '@components': resolve('src/components'),
    '@pages': resolve('src/pages'),
  };
  config.resolve.extensions = ['.js', '.jsx', '.json', '.ts', '.tsx'];
  return config;
};
