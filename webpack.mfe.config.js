const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  ...deps,
  react: {
    singleton: true,
    requiredVersion: deps.react,
  },
  'react-dom': {
    singleton: true,
    requiredVersion: deps['react-dom'],
  },
  'styled-components': {
    singleton: true,
    requiredVersion: deps['styled-components'],
  },
  'react-redux': {
    singleton: true,
    requiredVersion: deps['react-redux'],
  },
  'react-query': {
    singleton: true,
    requiredVersion: deps['react-query'],
  },
  lodash: {
    singleton: true,
    requiredVersion: deps['lodash'],
  },
};