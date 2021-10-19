/* eslint-disable */
const path = require('path');
const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const rewireTypingsForCssModule = require('react-app-rewire-typings-for-css-module');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
  }),
  addWebpackAlias({
    '@root': resolve('src'),
    '@components': resolve('src/components'),
    '@pages': resolve('src/pages'),
  }),
  (config, env) => {
    config = rewireTypingsForCssModule(config);
    return config;
  }
);
