/* eslint-disable @typescript-eslint/no-var-requires */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const mfe = require('./webpack.mfe.config');

// Load environment variables
const isDevelopment = process.env.NODE_ENV !== 'production';
const environment = process.env.ENVIRONMENT || 'development';

const currentPath = path.join(__dirname);
const basePath = `${currentPath}/.env`;
const envPath = `${basePath}.${environment}`;
const basePathLocal = `${basePath}.local`;
const envPathLocal = `${envPath}.local`;

// Loading Priority  (.env.[environment].local), (.env.local) , (.env.[environment])
const dotEnvFiles = [envPathLocal, basePathLocal, envPath].filter((file) => fs.existsSync(file));
dotEnvFiles.forEach((file) => {
    dotenv.config({ path: file });
});

// Filtering Environment Variables (environment variables prefixed with REACT_APP_)
const REACT_APP = /^REACT_APP_/i;
const rawEnv = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce((env, key) => {
        env[key] = process.env[key];
        return env;
    }, {});

// Injecting Environment Variables (new webpack.DefinePlugin(envKeys);)
const envKeys = Object.keys(rawEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(rawEnv[next]);
    return prev;
}, {});

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    devtool: 'source-map',
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: process.env.PORT || 1122,
    },
    target: 'web',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new webpack.ProvidePlugin({ process: 'process/browser' }),
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin({ overlay: false }),
        new webpack.DefinePlugin(envKeys),
        mfe.mfePlugin,
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@root': path.resolve(__dirname, './'),
            'process/browser': require.resolve('process/browser'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$|tsx/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: { plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean), },
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
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
};