/* eslint-disable */
const path = require('path');
const { override, addLessLoader, addWebpackAlias } = require('customize-cra');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#A80000' },
    },
  }),
  addWebpackAlias({
    '@root': resolve('src'),
    '@components': resolve('src/components'),
    '@pages': resolve('src/pages'),
  })
);
