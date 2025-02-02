const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { env } = require('process');
const { MFLiveReloadPlugin } = require('@module-federation/fmr');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const deps = require('./webpack.mfe.config');

const isDevelopment = process.env.NODE_ENV !== 'production';
const environment = env.ENVIRONMENT || 'development';

const currentPath = path.join(__dirname);
const basePath = `${currentPath}/.env`;
const basePathLocal = `${basePath}.local`;
const envPath = `${basePath}.${environment}`;
const envPathLocal = `${envPath}.local`;

const dotEnvFiles = [
  envPathLocal,
  process.env.ENVIRONMENT !== 'test' && basePathLocal,
  envPath,
].filter(Boolean);

dotEnvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand.expand(
      dotenv.config({
        path: dotenvFile,
      })
    );
  }
});

const REACT_APP = /^REACT_APP_/i;
const raw = Object.keys(process.env)
  .filter((key) => REACT_APP.test(key))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

const envKeys = Object.keys(raw).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(raw[next]);
  return prev;
}, {});

module.exports = (env) => {
  const shouldUseFMR = isDevelopment && env.FMR === 'true';
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 9090,
      historyApiFallback: true,
      client: {
        overlay: {
          runtimeErrors: (error) => {
            // ignore Error thrown from script on different origin
            return error.message !== 'Script error.';
          },
        },
      },
    },
    target: 'web',
    output: {
      chunkFilename: '[name].[contenthash].js',
      filename: '[name].[contenthash].js',
      assetModuleFilename: '[name].[contenthash][ext][query]',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    stats: 'errors-warnings',
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        excludeChunks: ['maddy'],
        templateParameters: { PUBLIC_URL: '/' },
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment &&
        new ReactRefreshWebpackPlugin({
          overlay: env.ENVIRONMENT !== 'playwright',
        }),
      new webpack.DefinePlugin(envKeys),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: 'write-references',
        },
      }),
      shouldUseFMR &&
        new MFLiveReloadPlugin({
          port: 9090,
          container: 'maddyMfe',
        }),
      new ModuleFederationPlugin({
        name: 'maddyMfe',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
            './Header': './src/components/Header',
            './Footer': './src/components/Footer',
            './WhatsAppWidget': './src/components/WhatsAppWidget',
            './Profile': './src/components/Profile',
            './ContactWidget': '/src/components/ContactWidget',
            './MaddyCardSection': './src/components/Card/MaddyCardSection',
            './MaddyCard': './src/components/Card/MaddyCard',
        },
        shared: {
          ...deps,
        },
      }),
    ].filter(Boolean),
    resolve: {
      modules: [__dirname, 'src', 'node_modules'],
      extensions: ['*', '.js', '.jsx', '.tsx', '.ts', '.d.ts'],
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@root': path.resolve(__dirname, './'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$|tsx/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
        {
          test: /.(js|jsx|.ts$|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: ['@babel/plugin-transform-runtime'],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
};
